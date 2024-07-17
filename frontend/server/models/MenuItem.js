const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true // Ensure name is unique
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    // Add more fields as needed
});

const MenuItem = mongoose.model('MenuItem', menuItemSchema);

module.exports = MenuItem;
