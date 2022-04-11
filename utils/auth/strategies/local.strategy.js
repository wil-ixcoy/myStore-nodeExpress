//con passport-local podemos hacer login con email y contraseña, obtenemos una
//estrategia para poder trabajar
const { Strategy } = require('passport-local');
//uso del servicio de autenticacion
const AuthService = require('../../../services/auth.service');
const service = new AuthService();

//estrategia local y creamos una instancia de la estrategia creada.
//obtenemos lo que necesitamos, y la funcion done para usarla cuando salga bien o mal
const localStrategy = new Strategy(
  {
    //nombres que sel el da para enviar en el json
    usernameField: 'email',
    passwordField: 'password',
  },

  async (email, password, done) => {
    try {
      //uso del del servicio de auth creado en este commit le enviamos email y contraseña
      const user = await service.getUser(email,password);
      done(null, user);
    } catch (error) {
      done(error, false);
    }
  }
);

module.exports = localStrategy;

//done se compone de error y false, y si es null el error con la informacion ejemplo el user
