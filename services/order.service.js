const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
class OrderService {
  constructor() {}
  async create(data) {
    const newOrder = await models.Order.create(data);
    return newOrder;
  }
//funcion que sirve para agregar un producto a una orden
// lo crea en el modelo de OrderProduct
  async addItem(data){
    const newItem = await models.OrderProduct.create(data);
    return newItem;
  }

  async find() {
    const orders = await models.Order.findAll();
    return orders;
  }

  async findOne(id) {
    const order = await models.Order.findByPk(id,{
      include:[
        {
          association:'customer',
          include:['user']
        },
        //agregamos items para que al ver una orden
        //muestre todos los productos, asi como muestra el cliente y usuario
        'items'
      ]
    });
    if (!order) {
      throw boom.notFound('order not found');
    }
    return order;
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

module.exports = OrderService;
