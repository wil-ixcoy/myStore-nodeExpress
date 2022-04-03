const boom = require('@hapi/boom');
//importar models de libs/sequelize
const {models} = require("../libs/sequelize");

class CategoryService {

  constructor(){
  }
  //se usa models.Category para enviar la data a creat en la base de datos, tabla category
  async create(data) {
    const newCategory = await models.Category.create(data);
    return newCategory;
  }

  async find() {
    //obtenemos todas las categorias
    const categories = await models.Category.findAll();
    return categories;
  }

  async findOne(id) {
    //obtenemos la categoria por id y mostramos los productos
    //que tiene asignados con include products
    const category = await models.Category.findByPk(id,{
      include: ["products"]
    });
    if (!category) {
      throw boom.notFound('category not found');
    }
    return category;
  }

  async update(id, changes) {
    //actualismos categoria
    const category = await this.findOne(id);
    const resultado = category.update(changes);
    return resultado;
  }

  async delete(id) {
    //eliminamos categoria por id
    const category = await this.findOne(id);
    await category.destroy();
    return { id };
  }

}

module.exports = CategoryService;
