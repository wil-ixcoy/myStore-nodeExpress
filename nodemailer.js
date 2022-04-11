
const nodemailer = require('nodemailer');
const config = require("./config/config")

// async..await is not allowed in global scope, must use a wrapper
async function sendMail() {
  // create reusable transporter object using the default SMTP transport

  //utiliza el modo smtp que es un estandar de envio de correos y usamos a gmail.com
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    //seguridad true y el puesot seguro es 465
    secure: true,
    port: 465,
    auth: {
      //usuario de gmail con el que se autientifica, va la contraseña dada por la app creada en seguridad
      //de google y el password que el mismo crea.
      user: config.email,
      pass: config.emailPassword,
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: config.email, // quien lo envia
    to: 'alexandertzoc891@gmail.com', // quien recibe
    subject: 'Este es un correo enviado con node.js', // titulo
    text: 'Hola mundo con nodemailer', // texto plano de lo que tiene que enviar
    html: '<b>Hola mundo con nodemailer</b>', // texto en html
  });

  console.log('Message sent: %s', info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

sendMail().catch(console.error);
