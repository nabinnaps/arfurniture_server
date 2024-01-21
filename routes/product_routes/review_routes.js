const express = require('express');
const router = express.Router();
const reviewController = require('../../controllers/product_controller/review_controller');

// Create a new review
router.post('/reviews', reviewController.createReview);

// Get a review by ID
router.get('/reviews/:id', reviewController.getReviewById);

// Update a review by ID
router.patch('/reviews/:id', reviewController.updateReview);

// Delete a review by ID
router.delete('/reviews/:id', reviewController.deleteReview);

module.exports = router;
