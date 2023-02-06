const Joi = require("joi");

let RegisterSchema = Joi.object().keys({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required()
});


module.exports = {
    RegisterSchema
}