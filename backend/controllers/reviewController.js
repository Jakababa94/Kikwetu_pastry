const Review = require('../models/Review');
const Product = require('../models/Product');

// Add a review (user)
exports.addReview = async (req, res) => {
  try {
    const { productId, rating, comment } = req.body;
    // Only one review per user per product
    const existing = await Review.findOne({ user: req.user.id, product: productId });
    if (existing) return res.status(400).json({ message: 'You have already reviewed this product' });
    const review = new Review({ user: req.user.id, product: productId, rating, comment });
    await review.save();
    // Update product rating
    const reviews = await Review.find({ product: productId });
    const averageRating = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;
    await Product.findByIdAndUpdate(productId, { averageRating, numReviews: reviews.length });
    res.status(201).json(review);
  } catch (err) {
    res.status(400).json({ message: 'Error adding review', error: err.message });
  }
};

// Get reviews for a product (public)
exports.getReviewsForProduct = async (req, res) => {
  try {
    const reviews = await Review.find({ product: req.params.productId }).populate('user', 'name');
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Update review (user or admin)
exports.updateReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: 'Review not found' });
    if (review.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }
    if (req.body.rating !== undefined) review.rating = req.body.rating;
    if (req.body.comment !== undefined) review.comment = req.body.comment;
    await review.save();
    // Update product rating
    const reviews = await Review.find({ product: review.product });
    const averageRating = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;
    await Product.findByIdAndUpdate(review.product, { averageRating, numReviews: reviews.length });
    res.json(review);
  } catch (err) {
    res.status(400).json({ message: 'Error updating review', error: err.message });
  }
};

// Delete review (user or admin)
exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: 'Review not found' });
    if (review.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }
    await review.deleteOne();
    // Update product rating
    const reviews = await Review.find({ product: review.product });
    const averageRating = reviews.length ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length : 0;
    await Product.findByIdAndUpdate(review.product, { averageRating, numReviews: reviews.length });
    res.json({ message: 'Review deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}; 