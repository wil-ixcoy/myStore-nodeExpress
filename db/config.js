//vamos a crear los archivos de conexion, usaurio password y demas
//MANEJA LAS MIGRACIONES
 const config = require('./../config/config')

//se crea la configuracion para modo de desarrollo cuando se usa en local, y modo produccion
//cuando se haga deploy a heroku, se usa la variable de config
//para poder ver que es si dev o produccion
module.exports = {
  development:{

    url: config.dbUrl,
    dialect: "postgres",

  },
  production:{
    url: config.dbUrl,
    dialect: "postgres",
  }
}
