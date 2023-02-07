"use strict";
const dotenv = require("dotenv");

const { app, connectedToDb } = require("./src/server/index.js");

dotenv.config();


const PORT = process.env.PORT || 3300;

connectedToDb()
  .then(() => {
    app.listen(process.env.PORT);
    console.log(`Server started at port ${process.env.PORT}`);
  })
  .catch((err) => {
    throw err;
  });
