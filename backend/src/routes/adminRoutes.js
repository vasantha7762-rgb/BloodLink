const express = require('express');
const router = express.Router();
const { getDashboardStats, getUsers, getStatistics } = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/dashboard', protect, authorize('admin'), getDashboardStats);
router.get('/users', protect, authorize('admin'), getUsers);
router.get('/statistics', protect, authorize('admin'), getStatistics);

module.exports = router;
