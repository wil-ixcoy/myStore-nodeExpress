const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(15);
const price = Joi.number().integer().min(10);
const description = Joi.string().min(10).max(100);
const image = Joi.string().uri();
//recibimos el id de la categoria
const categoryId = Joi.number().integer();
//valores para validar el query que se envia en la url
const limit = Joi.number().integer();
const offset = Joi.number().integer();
const priceMin = Joi.number().integer();
const priceMax = Joi.number().integer();

const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  description: description.required(),
  image: image.required(),
  //requerimos el id de la categoria
  categoryId: categoryId.required(),
});

const updateProductSchema = Joi.object({
  name: name,
  price: price,
  description: description,
  image: image,
  categoryId: categoryId,
});

const getProductSchema = Joi.object({
  id: id.required(),
});
//se valida estos datos al enviarse el query en la url

//agregamos mas formas para poder filtrar por precios y por rangos de precios
const queryProductSchema = Joi.object({
  limit,
  offset,
  price,
  priceMin,
  //decimos que priceMax es obligatorio si priceMin es diferente de undefined
  priceMax: priceMax.when('priceMin', {
    is: Joi.number().integer(),
    //cambio a no es requerido
    then: Joi.number().integer(),
  }),
});

module.exports = {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
  queryProductSchema,
};
