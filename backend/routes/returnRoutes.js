const express = require('express');
const router = express.Router();
const { createReturnRequest, getMyReturnRequests, getAllReturnRequests, updateReturnStatus } = require('../controllers/returnController');

router.post('/', createReturnRequest);
router.get('/my/:clerkUserId', getMyReturnRequests);
router.get('/all', getAllReturnRequests);
router.put('/:id/status', updateReturnStatus);

module.exports = router;