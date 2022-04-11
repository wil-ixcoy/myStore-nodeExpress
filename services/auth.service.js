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
//para obtener el email del usuaraio envido desde el body
  async sendEmail(email) {
    //comprobamos que el email existe con el servicio de findEmail de uer
    const emailComprobation = await service.findEmail(email);

    if(!emailComprobation){
      throw boom.unauthorized();
    }
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
//envamos el email
    await transporter.sendMail({
      from: config.email,
      to: `${emailComprobation.email}`,
      subject: 'Este es un correo enviado con node.js',
      text: 'Hola mundo con nodemailer',
      html: '<b>Hola mundo con nodemailer</b>',
    });
    return {
      message: 'email sent',
    }
  }
}

module.exports = AuthService;
