const { Model, DataTypes, Sequelize } = require('sequelize');

const { CUSTOMER_TABLE } = require('./customer.model');

const ORDER_TABLE = 'orders';

const OrderSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  createdAt: {
    field: 'created_at',
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
  updatedAt: {
    field: 'updated_at',
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
  //uso del id del cliente para relacionn, una orden,muchos
  //clientes
  customerId: {
    field: 'customer_id',
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: CUSTOMER_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
};


class Order extends Model {
  static associate(models){
    //una orden puede tenner varios clientes
    this.belongsTo(models.Customer, {
      as: 'customer',
    });
  //en orders hacemos la relacion con la tabla products,
  //diciendo que orders puede tener muchos productos, llamados items
    this.belongsToMany(models.Product,{
      as:'items',
      //through significa a traves de que tabla se va a resolver la relacion
      //y se coloca el nombre de la tabla ternaria
      through: models.OrderProduct,
      //colocamos llave foranea de la tabla OrderProduct
      // para que lo encuentre
      foreignKey: 'orderId',
      //y la otra llave es la de productos
      otherKey: 'productId',
    })
  }

  static config(sequelize){
    return{
      sequelize,
      tableName: ORDER_TABLE,
      modelName: 'Order',
      timpstamps: true,

    }
  }
}

module.exports = {
  Order,
  OrderSchema,
  ORDER_TABLE,
};
