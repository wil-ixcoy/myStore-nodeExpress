//le pasamos a dotenv el archivo .env para leerlos
require('dotenv').config();
const config = {
  env: process.env.NODE_ENV || 'development',
  //si proces.env es igual a produccion usa la variable
  //para comparar isProd
  isProd: process.env.NODE_ENV === 'production',

  port: process.env.PORT || 3000,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbPort: process.env.DB_PORT,
  dbName: process.env.DB_NAME,
  //variable que tiene toda la url de de conexion
  //de development pero si es produccion es la de Heroku
  //se define en las variables de ambiente
  dbUrl: process.env.DATABASE_URL,
  apiKey: process.env.API_KEY,
  //secreto de jwt en variable de entorno
  jwtSecret: process.env.JWT_SECRET,
};
module.exports = config;
