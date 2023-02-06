const transactionServices = require("../../services/transaction");
const Utils = require("../../utils/utils")
const {
  createTransactionSchema,
} = require("../../validation-schema/transaction");

const CONSTANTS = require("../../constants/utils");

exports.createTransaction = async (req, res) => {
  try {
    await Utils.validate(
      createTransactionSchema,
      req.body
    );

    let result = await transactionServices.createTransaction(req.body);

    res.status(CONSTANTS.HTTP_STATUS.OK).send(result);
  } catch (err) {
    console.log(err)
    let status =
      err.error?.status ?? CONSTANTS.HTTP_STATUS.INTERNAL_SERVER_ERROR;
    res.status(status).send(err);
  }
};
