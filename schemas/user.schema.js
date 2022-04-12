const Joi = require('joi');

const id = Joi.number().integer();
const email = Joi.string().email();
const password = Joi.string().min(8);
const role = Joi.string().min(5);
const newPassword = Joi.string().min(8);
const token = Joi.string();



const createUserSchema = Joi.object({
  email: email.required(),
  password: password.required(),
  role: role.required(),
});

const updateUserSchema = Joi.object({
  email: email,
  role: role,
});

const getUserSchema = Joi.object({
  id: id.required(),
});

const newPasswordUserSchema = Joi.object({
  newPassword: newPassword.required(),
  token: token.required(),
});

module.exports = {
  createUserSchema,
  updateUserSchema,
  getUserSchema,
  newPasswordUserSchema,
};
