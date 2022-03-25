const { Pool } = require('pg');
const  config  = require('../config/config.js');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);

//creamos la url de conexion con postgres
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

//creamos el pool de conexiones con el URI
const pool = new Pool({ connectionString: URI });

module.exports = pool;
