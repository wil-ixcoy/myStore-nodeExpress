//uso de sequelize
const { Model, DataTypes, Sequelize } = require('sequelize');

//creamos la tabla users
const USER_TABLE = 'users';

//creamos la estrucutra de cada atrbuto de la tabla users, allowNull es para que no sea nulo
//y unique es para que sea unico, y defaultValue es para que tenga un valor por defecto cuando se crea
//el usuario y el type es para definir un tipo y field es para definir el nombre del atributo
const UserSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  role:{
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: 'costumer',
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
};


class User extends Model {
  static  associate(){
    //
  }

  static config(sequelize){
    return{
      sequelize,
      tableName: USER_TABLE,
      //nombre con el que guardo sequelize la tabla y es consultada en los servicios
      modelName: 'User',
      timestamp: false
    }
  }
}

module.exports = {USER_TABLE, UserSchema, User};
