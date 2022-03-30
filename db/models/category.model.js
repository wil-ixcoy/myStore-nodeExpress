const { Model, DataTypes, Sequelize } = require('sequelize');

const CATEGORY_TABLE = 'categories';

const CategorySchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING(15),
    unique: true,
  },
  image: {
    allowNull: false,
    type: DataTypes.STRING(100),
  },
  created_At: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
};

class Category extends Model {
  static associate(models){
    //recibimos el modelo y decimos que categoria esta relacionado con product
    //mencionando que donde esta el hasMany(category) es que que es unico
    //y el modelo que se menciona (Product) es el que puede ser muchos, definimos
    //el alias y la clave foranea
      this.hasMany(models.Product, {as: 'products', foreignKey: 'categoryId'});
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CATEGORY_TABLE,
      modelName: 'Category',
      timpestamp: false,
    };
  }
}

module.exports = {
  Category,
  CategorySchema,
  CATEGORY_TABLE,
};
