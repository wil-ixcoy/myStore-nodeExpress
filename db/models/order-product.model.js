//tabla que une a productos con ordenes
//contiene las llaves foraneas de las tablas
const { Model, DataTypes, Sequelize } = require('sequelize');

const {ORDER_TABLE} = require('./order.model');
const {PRODUCT_TABLE} = require('./product.model');

const ORDER_PRODUCT_TABLE = 'order_product';

const OrderProductSchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  createdAt:{
    type: DataTypes.DATE,
    allowNull: false,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
  //cantindad de productos en la orden
  amount:{
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  //llave foranea de la tabla order
  order_id: {
    field: 'order_id',
    type: DataTypes.INTEGER,
    allowNull: false,
    references:{
      model: ORDER_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  //llave foranea de la tabla product
  product_id: {
    field: 'product_id',
    type: DataTypes.INTEGER,
    allowNull: false,
    references:{
      model: PRODUCT_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
};

class OrderProduct extends Model{
/*   static associate(models){
  } */

  static config(sequelize){
    return{
      sequelize,
      tableName: ORDER_PRODUCT_TABLE,
      modelName: 'OrderProduct',
      timestamps: false,
    }
  }
}

module.exports = {
  OrderProduct,
  OrderProductSchema,
  ORDER_PRODUCT_TABLE,
}
