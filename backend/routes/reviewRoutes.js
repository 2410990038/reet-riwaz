const express = require('express');
const router = express.Router();
const { addReview, getProductReviews, deleteReview } = require('../controllers/reviewController');

router.post('/', addReview);
router.get('/:productId', getProductReviews);
router.delete('/:id', deleteReview);

module.exports = router;