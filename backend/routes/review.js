const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const auth = require('../middleware/auth');

// Public
router.get('/product/:productId', reviewController.getReviewsForProduct);

// Protected
router.post('/', auth, reviewController.addReview);
router.put('/:id', auth, reviewController.updateReview);
router.delete('/:id', auth, reviewController.deleteReview);

module.exports = router; 