const express = require('express');
const router = express.Router();
const {
  getInventory,
  createInventoryItem,
  updateInventoryItem
} = require('../controllers/inventoryController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', getInventory);
router.post('/', protect, createInventoryItem);
router.put('/:id', protect, updateInventoryItem);

module.exports = router;
