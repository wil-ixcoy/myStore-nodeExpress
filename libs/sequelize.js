const { Sequelize } = require('sequelize');
const  config  = require('../config/config.js');
const {setupModels}= require('../db/models/index.js');

const options = {
  dialect: "postgres",
  logging: config.isProd ? false : true,
}
//agrega rejectUnauthorized:false para poder hacer deploy en caso
//de que sea true isProduct
if(config.isProd){
  options.ssl = {
    rejectUnauthorized: false
  }
}

//se usa la variable dbUrl de config
//pasamos las opciones
const sequelize = new Sequelize(config.dbUrl, options);

//enviamos al conexion hecha a db/models/index.js para que este conecte con los modelos
setupModels(sequelize);
module.exports = sequelize;
