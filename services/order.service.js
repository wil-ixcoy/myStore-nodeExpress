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


//funcion para retornas las ordenes por el usuario, usamos una consulta. usamos el id de usuario
//no de cliente
  async findByUser(userId) {


    //obtenemos las ordenes con order.FindAll
    const order = await models.Order.findAll({

    //filtramos orders, pero este tiene una relacio uno a uno con customer, pero no estamos
    //trabjando con customer, sino con user, por eso debemos saltar a la tabla user, no en customer

    //dentro de '' podemos el lugar en donde deseamos ir, no estamos en customer sino que en
    //user y dentro de ese el id,
      where:{
        '$customer.user.id$':userId
      },
      //al obtener las ordenes, incluimos el customer y el user
      include:[
        {
          association:'customer',
          include:['user']
        }
      ]
    });
    return order;
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
