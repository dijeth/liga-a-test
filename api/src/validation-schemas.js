const Joi = require('joi');
const { PasswordLength, NameLength } = require('./const');
const { getAuthRoles } = require('./utils');

const loginRules = {
  email: Joi
    .string()
    .email()
    .required(),

  password: Joi
    .string()
    .min(PasswordLength.MIN)
    .max(PasswordLength.MAX)
    .required(),
};

const registerRules = {
  ...loginRules,

  name: Joi
    .string()
    .pattern(/^[a-zа-я -]+$/i)
    .min(NameLength.MIN)
    .max(NameLength.MAX)
    .required(),

  lastname: Joi
    .string()
    .pattern(/^[a-zа-я -]+$/i)
    .min(NameLength.MIN)
    .max(NameLength.MAX)
    .required(),

  role: Joi
    .string()
    .valid(...getAuthRoles())
    .required(),

  passwordRepeat: Joi
    .valid(Joi.ref('password'))
    .required(),
};

const loginSchema = Joi.object(loginRules);

const registerSchema = Joi.object(registerRules);

const registerSchemaCsrf = Joi.object({
  ...registerRules,
  _csrf: Joi.string(),
});

module.exports = {
  loginSchema,
  registerSchema,
  registerSchemaCsrf,
};
