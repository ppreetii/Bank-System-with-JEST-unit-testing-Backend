const bcrypt = require("bcryptjs");

const User = require("../database/models/user");
const Account = require("../database/models/account");
const userUtils = require("../utils/utils");
const AppError = require("../utils/custom-error").AppError;

const ERRORS = require("../constants/error");
const CONSTANTS = require("../constants/utils");

exports.createUser = async (data = {}) => {
  try {
    await User.findUser(data?.email, null);

    data.password = await bcrypt.hash(data.password, CONSTANTS.HASH_SALT_VALUE);

    let user = await User.save(data);
    await Account.save(user?.dataValues?.id);

    return {
      id: user?.dataValues?.id,
      balance: CONSTANTS.DEFAULT_BALANCE,
    };
  } catch (err) {
    throw err;
  }
};

exports.validateUser = async (schema, data) => {
  try {
    await userUtils.validate(schema, data);
  } catch (error) {
    throw error;
  }
};
