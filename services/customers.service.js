const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
const bcrypt = require('bcrypt');

class CustomerService {
  constructor() {}

  async find() {
    const rta = await models.Customer.findAll({
      //incluimos la asociacion hecha en el model a user, por eso include: ['user']
      //aca se coloca todas las relaciones que hubieran
      include: ['user'],
    });
    return rta;
  }

  async findOne(id) {
    const user = await models.Customer.findByPk(id);
    if (!user) {
      throw boom.notFound('customer not found');
    }
    return user;
  }

  async create(data) {
    //uso de bcrypt para hashear el password para que sea seguro,
    const hash = await bcrypt.hash(data.user.password,5);
    //creamos un nuevo grupo de datos que tiene a data y a user que esta dentro de
    //user.data y cambiamos el password por el hash para enviarlo a la base de datos
    const newData = {
      ...data,
      user:{
        ...data.user,
        password:hash
      }
    }
    delete newData.user.dataValues.password;
    //al crear un cliente, con la data, pero incluye los datos del usuario como email y contraseña
    const newCustomer = await models.Customer.create(newData,{
      include: ['user'],
    });
    return newCustomer;
  }

  async update(id, changes) {
    const model = await this.findOne(id);
    const rta = await model.update(changes);
    return rta;
  }

  async delete(id) {
    const model = await this.findOne(id);
    await model.destroy();
    return { rta: true };
  }
}

module.exports = CustomerService;
