const Sequelize = require("sequelize");

const sequelize = require("../config/database");
const {AppError} = require('../../utils/custom-error')
const ERRORS = require('../../constants/error')

const User = sequelize.define(
  "User",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  { timestamps: true }
);

let save = async (data) => {
  try {
    const user = await User.create({
      name: data?.name,
      email: data?.email,
      password: data?.password,
    });
  
    return user;
  } catch (error) {
    console.log(error.message)
    throw new AppError(ERRORS.USER_CREATION_ERROR)
  }
  
};

let findUser = async (email,id) => {
  let userObj = {};
  if(email)
  userObj.email = email;
  if(id)
  userObj.id = id

  try {
    const user = await User.findOne({
      where: { ...userObj }
    });
    
    if(!user)
    throw new AppError(ERRORS.USER_NOT_FOUND_ERROR)

    return user;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  User,
  save,
  findUser
};
