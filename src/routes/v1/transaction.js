const express = require('express');

const transactionController = require('../../controllers/v1/transaction');

const router = express.Router();

router.post('/', transactionController.createTransaction);

module.exports = router;