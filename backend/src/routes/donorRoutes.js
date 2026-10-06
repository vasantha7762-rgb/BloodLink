const express = require('express');
const router = express.Router();
const {
  getDonors,
  searchDonors,
  getDonorById,
  registerDonorProfile,
  updateDonor,
  updateAvailability
} = require('../controllers/donorController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', getDonors);
router.get('/search', searchDonors);
router.get('/:id', getDonorById);
router.post('/', registerDonorProfile);
router.put('/:id', protect, updateDonor);
router.put('/:id/availability', protect, updateAvailability);

module.exports = router;
