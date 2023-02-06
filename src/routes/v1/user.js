const express = require('express');

const userController = require('../../controllers/v1/user');
const COMMON_CONSTANTS = require("../../constants/common")

const router = express.Router();

router.post(COMMON_CONSTANTS.USER_ROUTES.REGISTER, userController.createUser);

module.exports = router;