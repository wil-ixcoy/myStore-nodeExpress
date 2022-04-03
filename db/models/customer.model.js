const { Model, DataTypes, Sequelize } = require('sequelize');
//imortamos la tabla para que sea usada en el modelo y definir la relacion con la clave foranea
const { USER_TABLE } = require('./user.model')

const CUSTOMER_TABLE = 'customers';

const CustomerSchema =  {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  lastName: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'last_name',
  },
  phone: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
  //esta es la llave foranea, con refrences decimos que tabla es la que esta realcionada
  userId:{
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'user_id',
    unique: true,
    //referenciamos a user
    references: {
      model: USER_TABLE,
      key: 'id',
    },
    //se expresa que pasa si se elimina el dato con el que se relaciona, es decir si en
    //user se elimina el id se elimina todo lo relacionado con el en Customer
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  }
}

class Customer extends Model {
//clse que sirve para aosciar esta tabla con la de users
  static associate(models) {
    //esta clase va a tener una relacion con la clase User que sellama user
    this.belongsTo(models.User, {as: 'user'});
    //un cliente puede tener muchas ordenes
    this.hasMany(models.Order, {as: 'orders', foreignKey: 'customerId'});
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CUSTOMER_TABLE,
      modelName: 'Customer',
      timestamps: false
    }
  }
}

module.exports = { Customer, CustomerSchema, CUSTOMER_TABLE };
