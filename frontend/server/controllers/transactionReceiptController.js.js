const TransactionReceipt = require('../models/TransactionReceipt');
const { v4: uuidv4 } = require('uuid'); // Import UUID

// Controller function to create a new transaction receipt
const createTransactionReceipt = async (req, res) => {
    try {
        const { menuItems, totalAmount, customerName } = req.body;

        // Generate a unique transaction ID
        const transactionId = uuidv4();

        const newReceipt = new TransactionReceipt({
            transactionId,
            menuItems,
            totalAmount,
            customerName,
            createdAt: new Date()
        });

        const savedReceipt = await newReceipt.save();
        res.status(201).json(savedReceipt);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Controller function to retrieve all transaction receipts
const getAllTransactionReceipts = async (req, res) => {
    try {
        const receipts = await TransactionReceipt.find();
        res.status(200).json(receipts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller function to retrieve a specific transaction receipt by transactionId
const getTransactionReceiptById = async (req, res) => {
    try {
        const { transactionId } = req.params;
        const receipt = await TransactionReceipt.findOne({ transactionId });
        if (!receipt) {
            return res.status(404).json({ message: 'Transaction receipt not found' });
        }
        res.status(200).json(receipt);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller function to update a transaction receipt by transactionId
const updateTransactionReceiptById = async (req, res) => {
    try {
        const { transactionId } = req.params;
        const { menuItems, totalAmount, customerName } = req.body;

        const updatedReceipt = await TransactionReceipt.findOneAndUpdate(
            { transactionId },
            { $set: { menuItems, totalAmount, customerName } },
            { new: true }
        );

        if (!updatedReceipt) {
            return res.status(404).json({ message: 'Transaction receipt not found' });
        }

        res.status(200).json({
            data:updatedReceipt,
            message:"updated successfully"
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller function to delete a transaction receipt by transactionId
const deleteTransactionReceiptById = async (req, res) => {
    try {
        const { transactionId } = req.params;
        const deletedReceipt = await TransactionReceipt.findOneAndDelete({ transactionId });
        if (!deletedReceipt) {
            return res.status(404).json({ message: 'Transaction receipt not found' });
        }
        res.status(200).json({ message: 'Transaction receipt deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createTransactionReceipt,
    getAllTransactionReceipts,
    getTransactionReceiptById,
    updateTransactionReceiptById,
    deleteTransactionReceiptById
};
