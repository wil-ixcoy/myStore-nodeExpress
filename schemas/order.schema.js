const Joi = require('joi');

const id = Joi.number().integer();
const customerId = Joi.number().integer();
//crear estado, entregado, falta, en camino

const getOrderSchema = Joi.object({
  id: id.required(),
});

const createOrderSchema = Joi.object({
  customerId: customerId.required(),
});

module.exports = {
  getOrderSchema,
  createOrderSchema,
};
