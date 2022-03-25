//se encarga de enviar la conexion a los modelos para poder mapear y sereliazar
//requerimos de el modelo users
const {User, UserSchema} = require("./user.model.js");

//creamos funcion que recibe un parametro para luego ser usado en User(clase con el modelo)
//usamos init para que lo inicialice y enviamos el UserSchema para que se mapee y el User usando
//el metodo config recibe el parametro de la function setupModels
function setupModels(sequelize) {
  User.init(UserSchema,User.config(sequelize));
}

//exportamos la function setupModels
module.exports = {setupModels};
