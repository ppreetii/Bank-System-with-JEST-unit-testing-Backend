"use strict";
const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

const CONSTANTS = require("../constants/common");
const db = require("../database/models/index");
const userRoutes = require("../routes/v1/user");
const transactionRoutes = require("../routes/v1/transaction");

const BASE_URL = CONSTANTS.BASE_URL;

dotenv.config();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(`${BASE_URL}${CONSTANTS.USER}`, userRoutes);
app.use(`${BASE_URL}${CONSTANTS.TRANSACTION}`, transactionRoutes);

async function connectedToDb() {
  try {
    await db.sequelize.sync();
    console.log("Database connected");
  } catch (error) {
    throw error;
  }
};

module.exports = {
  app,
  connectedToDb
};
