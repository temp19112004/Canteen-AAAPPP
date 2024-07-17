const express = require('express');
const mongoose = require('mongoose');
const menuItemRoutes = require('./routes/menuItems'); 
const transactionReceiptRoutes = require('./routes/transactionReceipts'); 
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
    process.exit(1); // Exit process with failure
});

// Middleware
app.use(express.json());

// Routes
app.use('/api/menu-items', menuItemRoutes);
app.use('/api/transaction-receipts', transactionReceiptRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
