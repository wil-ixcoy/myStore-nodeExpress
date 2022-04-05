const { Pool } = require('pg');
const config = require('../config/config.js');

let URI = '';
//si isProduct is true que agregue la varible de ambiente
//de Heroku (DATABASE_URL) para iniciar el modo de produccion
if (config.isProd) {
  URI = config.dbUrl;
} else {
  //si no cumple que haga lo mismo de siempre en development
  const USER = encodeURIComponent(config.dbUser);
  const PASSWORD = encodeURIComponent(config.dbPassword);

  //creamos la url de conexion con postgres
  URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
}

//creamos el pool de conexiones con el URI
const pool = new Pool({ connectionString: URI });

module.exports = pool;
