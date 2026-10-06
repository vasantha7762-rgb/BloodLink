const express = require('express');
const router = express.Router();
const {
  getHospitals,
  getHospitalById,
  createHospital,
  updateHospital
} = require('../controllers/hospitalController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', getHospitals);
router.get('/:id', getHospitalById);
router.post('/', protect, createHospital);
router.put('/:id', protect, updateHospital);

module.exports = router;
