const express = require('express');
const router = express.Router();
const menuItemController = require('../controllers/menuItemController.js'); // Corrected path

// Routes related to menu items
router.post('/', menuItemController.createMenuItem); 
router.get('/', menuItemController.getAllMenuItems);
router.get('/:id', menuItemController.getMenuItemById);
router.put('/:id', menuItemController.updateMenuItemById);
router.delete('/:id', menuItemController.deleteMenuItemById);

module.exports = router;
 