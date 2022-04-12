const UserService = require('./user.service');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
//uso del servicio de user par aobtener el email
const service = new UserService();
const config = require('./../config/config');

class AuthService {
  //obtenemos el usuario esto con el servicio de user con el metodo findEmail
  async getUser(email, password) {
    const user = await service.findEmail(email);
    if (!user) {
      //si no existe no autoriza
      throw boom.unauthorized();
    }
    //compara el password con el hash y si es correcto
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw boom.unauthorized();
    }
    //elemina el password del response y lo retorna
    delete user.dataValues.password;
    return user;
  }

  //para inciar sesion con token
  signToken(user) {
    //creamos el payload
    const payload = {
      sub: user.id,
      role: user.role,
    };
    //firmamos el token y los mostramos en el res.json
    const token = jwt.sign(payload, config.jwtSecret);
    return {
      user,
      token,
    };
  }

  async sendRecovery(email) {
    //comprobamos que el email existe con el servicio de findEmail de uer
    const emailComprobation = await service.findEmail(email);

    if (!emailComprobation) {
      throw boom.unauthorized();
    }
    //creamos un payload que tenga el id del usuario para leugo verificar que es el
    const payload = {sub: emailComprobation.id};
    //firmamos el token con payload y la clave secreta y expira en 10 minutos
    const token = jwt.sign(payload, config.jwtSecret,{expiresIn: '10min'});
//para esto se el dice al frontend que tengan una vista para recibir esta url, normalmente acpeta la nueva contraseña
//para cambiarlo en el backend
    const link= `http://myfrontend.com/recovery?token=${token}`;

    //usamos update de user para agregar el al usuario con id el token
    await service.update(emailComprobation.id, {recoveryToken: token});
    //configuramos el email
    const mail = {
      from: config.email,
      to: `${emailComprobation.email}`,
      subject: 'Email para recuperar contraseña',
      html: `<b>Ingresa  este link =>${link} </b>`,
    };
    const rta = await this.sendEmail(mail);
    return rta;
  }

  async sendEmail(infoMail) {
    //creamose el tranport para enviar el email
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: config.email,
        pass: config.emailPassword,
      },
    });
    //envamos el email pasando solo un parametro poor que ya esta configurado en el metodo
    //sendRecovery
    await transporter.sendMail(infoMail);
    return {
      message: 'email sent',
    };
  };
//funcion para cambiar el password
  async changePassword(token,newPassword){
    try{
      //vericiamos el token con el secreo
      const payload = jwt.verify(token, config.jwtSecret);
      //obtenemos el id del usuario que esta en el sub del payload
      const user = await service.findOne(payload.sub);

      //compramos que sea igual a de la base de datos
      if(user.recoveryToken !== token){
        throw boom.unauthorized();
      }else{
        //hasheamos la nueva contraseña
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        //actualizamos la nueva contraseña
        await service.update(user.id, {password: hashedPassword, recoveryToken: null});
        return {
          message: 'password changed',
        };
      }
    }catch(error){
      boom.unauthorized();
    }
  }
}

module.exports = AuthService;
