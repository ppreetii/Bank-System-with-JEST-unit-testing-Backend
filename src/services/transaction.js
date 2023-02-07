const Utils = require("../utils/utils");
const CONSTANTS = require("../constants/utils");
const { AppError } = require("../utils/custom-error");
const ERRORS = require("../constants/error");
const User = require("../database/models/user");
const Transaction = require("../database/models/transaction");
const Account = require("../database/models/account");

exports.createTransaction = async (data = {}) => {
  try {
    const { type, userId, amount } = data;
    const isExist = await User.findUser(null, userId);
  
    if(!isExist)
    throw new AppError(ERRORS.USER_NOT_FOUND_ERROR)

    let { balance } = await Account.findAccountOfUser(userId);

    balance = parseFloat(balance);

    if (type === CONSTANTS.DEPOSIT_TYPE) balance += amount;

    if (type === CONSTANTS.WITHDRAW_TYPE) {
      if (balance < amount) {
        throw new AppError(ERRORS.LOW_BALANCE_ERROR);
      }

      balance -= amount;
    }

    balance = balance.toFixed(CONSTANTS.PRECISION)

    await Account.updateAccount(userId, balance);
    const transactionDetails = await Transaction.save(data);

    return {
      userId,
      balance,
      transactionId: transactionDetails.id,
    };
  } catch (error) {
    throw error;
  }
};

exports.validateTransaction = async (schema, data) => {
  try {
    await Utils.validate(schema, data);
  } catch (error) {
    throw error;
  }
};
