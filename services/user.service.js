//const boom = require('@hapi/boom');
//const getConnection  = require('../libs/postgres');

//sequelize no tiene ni un models escrito, pero el ORM guarda con un nombre y por eso se llama a ese objeto
const {models} = require("../libs/sequelize");

class UserService {
  constructor() {}

  async create(data) {
    return data;
  }
  //usamos el modelo con nombre User que guardo sequelize y traemos todo lo que tenga y lo retornamos
  async find() {
    const resultado = await models.User.findAll();
    return resultado;
  }

  async findOne(id) {
    return { id };
  }

  async update(id, changes) {
    return {
      id,
      changes,
    };
  }

  async delete(id) {
    return { id };
  }
}

module.exports = UserService;
