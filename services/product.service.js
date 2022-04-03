const boom = require('@hapi/boom');
//usamos el pool para manejar una unica conexion que siempre este abierta
const { models } = require('../libs/sequelize');
class ProductsService {
  constructor() {

  }



  async create(data) {
    //creacion de producto
    const newProduct = await models.Product.create(data);
    return newProduct;
  }

  async find() {
    //obtencion de todos los productos con su respectiva categoria que fue
    //asignada al crear el producto
    const products = await models.Product.findAll({
      include: ["category"]
    });
    return products;
  }

  async findOne(id) {
    //obtenemos producto por id
    const product = models.Product.findByPk(id);
    if (!product) {
      throw boom.notFound('product not found');
    }
    return product;
  }

  async update(id, changes) {
    //actualizamos con id y pasamos los cambios a update
    const product = await this.findOne(id);

    const resultado = product.update(changes);
    return resultado;
  }

  async delete(id) {
    //eliminamos producto por id
    const product = await this.findOne(id);
    await product.destroy();
    return { id };
  }
}

module.exports = ProductsService;
