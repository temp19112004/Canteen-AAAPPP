const express = require('express');
const router = express.Router();
const transactionReceiptController = require('../controllers/transactionReceiptController.js');

// Routes related to transaction receipts
router.post('/', transactionReceiptController.createTransactionReceipt);
router.get('/', transactionReceiptController.getAllTransactionReceipts);
router.get('/:transactionId', transactionReceiptController.getTransactionReceiptById);
router.put('/:transactionId', transactionReceiptController.updateTransactionReceiptById);
router.delete('/:transactionId', transactionReceiptController.deleteTransactionReceiptById);

module.exports = router;
