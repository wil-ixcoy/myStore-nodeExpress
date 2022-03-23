//const boom = require('@hapi/boom');
const getConnection  = require('../libs/postgres');

class UserService {
  constructor() {}

  async create(data) {
    return data;
  }
  //usamos la funcion en find para poder usar la tabala tasks que retorno la misma funcion getConnection
  async find() {
    const client = await getConnection();
    const result = await client.query("SELECT * FROM tasks");
    return result.rows;
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
