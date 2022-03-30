//se encarga de enviar la conexion a los modelos para poder mapear y sereliazar
//requerimos de el modelo users
const {User, UserSchema} = require("./user.model.js");
const {Customer, CustomerSchema} = require("./customer.model.js");
const {Category, CategorySchema} = require("./category.model.js");
const {Product, ProductSchema} = require("./product.model.js");

//creamos funcion que recibe un parametro para luego ser usado en User(clase con el modelo)
//usamos init para que lo inicialice y enviamos el UserSchema para que se mapee y el User usando
//el metodo config recibe el parametro de la function setupModels
function setupModels(sequelize) {
  User.init(UserSchema,User.config(sequelize));
  Customer.init(CustomerSchema,Customer.config(sequelize));
  Category.init(CategorySchema,Category.config(sequelize));
  Product.init(ProductSchema,Product.config(sequelize));
  //corremos la asociacion que se definion en customers.model.js y le enviamos los modelos que estan
  //en sequelize.models
  Customer.associate(sequelize.models);
  User.associate(sequelize.models);

  //asosiacion de una categoria y muchos productos
  Category.associate(sequelize.models);
  Product.associate(sequelize.models);

}

//exportamos la function setupModels
module.exports = {setupModels};
