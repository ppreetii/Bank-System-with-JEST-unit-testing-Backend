const userServices = require("../../services/user")
const { RegisterSchema } = require("../../validation-schema/user");

const ERRORS = require("../../constants/error");
const CONSTANTS = require("../../constants/utils")

exports.createUser = async (req, res) => {
  try {
    await userServices.validateUser(RegisterSchema,req.body)

    const {id, balance} = await userServices.createUser(req.body)
    
    res.status(CONSTANTS.HTTP_STATUS.CREATED).send({
      id, balance
    });
  } catch (err) {
    let status = err.error?.status ?? ERRORS.INTERNAL_SERVER_STATUS
    res.status(status).send(err);
  }
};
