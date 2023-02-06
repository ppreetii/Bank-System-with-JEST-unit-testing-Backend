const Sequelize = require("sequelize");

const sequelize = require("../config/database");
const User = require('../models/user');
const CONSTANTS = require("../../constants/utils")
const ERRORS = require("../../constants/error")
const {AppError} = require("../../utils/custom-error")

const Transaction = sequelize.define(
  "Transaction",
  {
    id: {
      type: Sequelize.BIGINT,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    type: {
      type: Sequelize.ENUM,
      values: [CONSTANTS.DEPOSIT_TYPE,CONSTANTS.WITHDRAW_TYPE],
      allowNull: false
    },
    amount: {
      type: Sequelize.DECIMAL(10, 2),
      defaultValue: 0.00
    }
  },
  { timestamps: true }
);

Transaction.belongsTo(User.User, {
  foreignKey: 'userId',
});

let save = async (data = {}) =>{
 try {
    const transaction = await Transaction.create({
      type: data?.type,
      userId: data?.userId,
      amount: data?.amount,
    });
  
    return transaction;
  } catch (error) {
    throw new AppError(ERRORS.TRANSACTION_CREATION_ERROR)
  }
}

module.exports = {Transaction,save};
