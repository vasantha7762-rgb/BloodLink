const express = require('express');
const router = express.Router();
const {
  createRequest,
  getRequests,
  getRequestById,
  updateRequest,
  acceptRequest,
  rejectRequest
} = require('../controllers/requestController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', getRequests);
router.get('/:id', getRequestById);
router.post('/', createRequest);
router.put('/:id', protect, updateRequest);
router.post('/:id/accept', protect, acceptRequest);
router.post('/:id/reject', protect, rejectRequest);

module.exports = router;
