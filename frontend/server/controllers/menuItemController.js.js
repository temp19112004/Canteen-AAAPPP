const MenuItem = require('../models/MenuItem');

// Controller function to create a new menu item
const createMenuItem = async (req, res) => {
    try {
        const { name, price, category } = req.body;

        // Check if a menu item with the same name already exists
        const existingMenuItem = await MenuItem.findOne({ name });
        if (existingMenuItem) {
            return res.status(400).json({ message: 'Menu item with this name already exists' });
        }

        const newMenuItem = new MenuItem({
            name,
            price,
            category
            // Add more fields as needed
        });

        const savedMenuItem = await newMenuItem.save();
        return res.status(200).json({
            data: savedMenuItem,
            message: `Created menu item '${name}' successfully`
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Controller function to retrieve all menu items
const getAllMenuItems = async (req, res) => {
    try {
        const menuItems = await MenuItem.find();

        return res.status(200).json({
            data: menuItems,
            message: `Fetched ${menuItems.length} menu items successfully`
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller function to retrieve a specific menu item by id
const getMenuItemById = async (req, res) => {
    try {
        const { id } = req.params;
        const menuItem = await MenuItem.findById(id);
        if (!menuItem) {
            return res.status(404).json({ message: 'Menu item not found' });
        }
        res.status(200).json(menuItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller function to update a menu item by id
const updateMenuItemById = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price, category } = req.body;

        const updatedMenuItem = await MenuItem.findByIdAndUpdate(
            id,
            { $set: { name, price, category } },
            { new: true }
        );

        if (!updatedMenuItem) {
            return res.status(404).json({ message: 'Menu item not found' });
        }

        res.status(200).json(updatedMenuItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller function to delete a menu item by id
const deleteMenuItemById = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedMenuItem = await MenuItem.findByIdAndDelete(id);
        if (!deletedMenuItem) {
            return res.status(404).json({ message: 'Menu item not found' });
        }
        res.status(200).json({ message: 'Menu item deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createMenuItem,
    getAllMenuItems,
    getMenuItemById,
    updateMenuItemById,
    deleteMenuItemById
};
