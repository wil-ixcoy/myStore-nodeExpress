//vamos a crear los archivos de conexion, usaurio password y demas

/* const {config} = require('../config/config.js');
 */
const USER = encodeURIComponent("nico");
const PASSWORD = encodeURIComponent("admin123");

const URI = `postgres://${USER}:${PASSWORD}@localhost:5432/postgres`;
//se crea la configuracion para modo de desarrollo cuando se usa en local, y modo produccion
//cuando se haga deploy a heroku
module.exports = {
  development:{
    url: URI,
    dialect: "postgres",

  },
  production:{
    url: URI,
    dialect: "postgres",
  }
}
