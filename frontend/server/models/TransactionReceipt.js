const mongoose = require('mongoose');

const transactionReceiptSchema = new mongoose.Schema({
    transactionId: {
        type: String,
        required: true,
        unique: true
    },
    menuItems: [{
        name: String,
        price: Number,
        category: String
        // Add more fields as needed
    }],
    totalAmount: {
        type: Number,
        required: true
    },
    customerName: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const TransactionReceipt = mongoose.model('TransactionReceipt', transactionReceiptSchema);

module.exports = TransactionReceipt;
