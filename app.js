"use strict";
const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

const CONSTANTS = require("./src/constants/common");
const db = require("./src/database/models/index");
const userRoutes = require("./src/routes/v1/user");
const transactionRoutes = require("./src/routes/v1/transaction");

const BASE_URL = CONSTANTS.BASE_URL;

dotenv.config();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(`${BASE_URL}${CONSTANTS.USER}`, userRoutes);
app.use(`${BASE_URL}${CONSTANTS.TRANSACTION}`, transactionRoutes);

db.sequelize
  .sync()
  .then(() => {
    app.listen(process.env.PORT);
    console.log(`Server started at port ${process.env.PORT}`);
  })
  .catch((err) => console.log(err));
