const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
//sequelize no tiene ni un models escrito, pero el ORM guarda con un nombre y por eso se llama a ese objeto
const {models} = require("../libs/sequelize");

class UserService {
  constructor() {}
//funcion para crear un usuario, recibe un objeto con los datos del usuario
  async create(data) {
    //uso de bycript
    const hash = await bcrypt.hash(data.password,5)
    //creamos un nuevo usuario al que le pasamos el hash para guardar en el lugar del password
    const newUSer = await models.User.create({
      ...data,
      password:hash
    });
    //borramos el password para que no se muestre como respuesta en el cliente
    delete newUSer.dataValues.password;
    return newUSer;
  }
  //usamos el modelo con nombre User que guardo sequelize y traemos todo lo que tenga y lo retornamos
  async find() {
    const resultado = await models.User.findAll(
      {
        include: ["customer"]
      }
    );
    return resultado;
  }
//funcion para buscar un usuario por su id usamos findByPk para buscar por id luego comparamos que sea
//distinto de nulo si lo es retornamos un error con boom
  async findOne(id) {
    const user = await models.User.findByPk(id);
    if (!user) {
      throw boom.notFound("User not found");
    }
    return user;
  }
//usamos la funcion findOne para buscar un usuario por su id y luego usamos update para actualizar
  async update(id, changes) {
    const user = await this.findOne(id);
    const resultado = user.update(changes);
    return resultado;
  }

  async delete(id) {
    const user = await this.findOne(id);
    await user.destroy();
    return { id };
  }
}

module.exports = UserService;
