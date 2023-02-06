const Sequelize = require("sequelize");
const { v4: uuid4 } = require("uuid");

const sequelize = require("../config/database");
const {User} = require("../models/user");
const ERRORS = require("../../constants/error");
const {AppError} = require("../../utils/custom-error")

const Account = sequelize.define("Account", {
  accountNumber: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  balance: {
    type: Sequelize.DECIMAL(10, 2),
    defaultValue: 0.0,
    allowNull: false,
  },
});

Account.belongsTo(User, {
  foreignKey: "userId",
});

let save = async (userId) => {
  try {
    const account = await Account.create({
      accountNumber: uuid4(),
      userId,
    });

    return account;
  } catch (error) {
    throw new AppError({
      ...ERRORS.ACCOUNT_CREATION_ERROR,
      error: error.message
    });
  }
};

let findAccountOfUser = async (userId) =>{
  try {
    const accountDetails = await Account.findOne({where:{userId}})
    return accountDetails
  } catch (error) {
    throw new AppError({
      ...ERRORS.ACCOUNT_DETAILS_FIND_ERROR,
      error: error.message
    });
  }
}

let updateAccount = async (userId,balance) =>{
  try {
    const updatedData = await Account.update({
      balance
    },{
      where : {userId}
    })

    return updatedData;
  } catch (error) {
    throw new AppError({
      ...ERRORS.ACCOUNT_DETAILS_UPDATE_ERROR,
      error: error.message
    });
  }
}

module.exports = {
  Account,
  save,
  updateAccount,
  findAccountOfUser
};
