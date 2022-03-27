//vamos a crear los archivos de conexion, usaurio password y demas

const {config} = require('../config/config.js');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);

const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
//se crea la configuracion para modo de desarrollo cuando se usa en local, y modo produccion
//cuando se haga deploy a heroku
module.exports = {
  development:{
    url: URI,
    dialect: 'postgres',

  },
  production:{
    url: URI,
    dialect: 'postgres',
  }
}
