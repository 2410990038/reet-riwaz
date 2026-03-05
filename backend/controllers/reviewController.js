const Review = require('../models/Review');

// Add or update review
const addReview = async (req, res) => {
  const { productId, userId, userName, userImage, rating, comment } = req.body;
  try {
    const existing = await Review.findOne({ productId, userId });
    if (existing) {
      existing.rating = rating;
      existing.comment = comment;
      await existing.save();
      return res.status(200).json({ message: 'Review updated', review: existing });
    }
    const review = await Review.create({ productId, userId, userName, userImage, rating, comment });
    res.status(201).json({ message: 'Review added', review });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all reviews for a product
const getProductReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ productId: req.params.productId }).sort({ createdAt: -1 });
    const avgRating = reviews.length
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : 0;
    res.status(200).json({ reviews, avgRating, totalReviews: reviews.length });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete review
const deleteReview = async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Review deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { addReview, getProductReviews, deleteReview };