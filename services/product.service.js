const boom = require('@hapi/boom');
const {Op} = require('sequelize');
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

  async find(query) {
    //creamos opciones en donde por defecto incluye a category
    const options = {
      include: ['category'],
      where:{}
    }
    //recibimos los dos datos del query
    const {limit, offset, price, priceMax, priceMin} = query;
    //obligatoriamente deben estar los dos datos para ser agregados a options
    if(limit && offset){
      options.limit  = limit,
      options.offset = offset
    }

    if(price){
      options.where.price = price;
    }
    //validamos que pricemin y max vengan en el query
    if(priceMin && priceMax){
      //hacemos la consulta y el precio sera
      options.where.price = {
        //apareceran los iguales o meyores a
        [Op.gte]: priceMin,
        //y menores o iguales a
        [Op.lte]: priceMax,
      }
    }

    //pasamos optiones para obtener los productos
    const products = await models.Product.findAll(options);
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
