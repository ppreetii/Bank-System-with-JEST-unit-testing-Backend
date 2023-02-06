const Joi = require("joi");
const CONSTANTS = require("../constants/utils")

let createTransactionSchema = Joi.object().keys({
  type: Joi.string().valid(CONSTANTS.DEPOSIT_TYPE,CONSTANTS.WITHDRAW_TYPE).required(),
  userId: Joi.number().integer().required(),
  amount: Joi.number().required()
}).required();


module.exports = {
    createTransactionSchema
}