const { Sequelize } = require('sequelize');
const  config  = require('../config/config.js');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);

//creamos la url de conexion con postgres
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;


//creamos una instancia de sequelize pasandole la uri en donde se va a conectar, dialect es el tipo de
//base de datos que se va a utilizar y logging es para ver si esta activado el log de las consultas
const sequelize = new Sequelize(URI,{
  dialect: "postgres",
  logging: true,

})

module.exports = sequelize;
