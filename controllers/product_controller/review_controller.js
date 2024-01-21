const Review = require('../../models/product_model/review_model.js');

exports.createReview = async (req, res) => {
  try {
    if (!req.body) {
      res.status(400).send({ message: 'Content can not be empty!' });
      return;
    }

    const { userId, productId, rating, comment } = req.body;

    const newReview = new Review({
      userId: userId,
      productId: productId,
      rating: rating,
      comment: comment,
    });

    const createdReview = await Review.create(newReview);
    res.json({
      status: true,
      message: 'Review created successfully!',
      review: createdReview,
    });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Some error occurred while creating the review.' });
  }
};

exports.getReviewById = async (req, res) => {
  try {
    const reviewId = req.params.id;
    const review = await Review.findById(reviewId);

    if (!review) {
      res.status(404).json({ status: false, message: 'Review not found with the provided ID.' });
      return;
    }

    res.json({
      status: true,
      message: 'Review retrieved successfully!',
      review: review,
    });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Some error occurred while retrieving the review.' });
  }
};

exports.updateReview = async (req, res) => {
  try {
    const reviewId = req.params.id;
    const updatedReviewData = req.body;

    const existingReview = await Review.findById(reviewId);

    if (!existingReview) {
      res.status(404).json({ status: false, message: 'Review not found with the provided ID.' });
      return;
    }

    const updatedReview = await Review.update({
      id: reviewId,
      ...updatedReviewData,
    });

    res.json({
      status: true,
      message: 'Review updated successfully!',
      review: updatedReview,
    });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Some error occurred while updating the review.' });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const reviewId = req.params.id;
    const deletedReview = await Review.delete(reviewId);

    if (!deletedReview) {
      res.status(404).json({ status: false, message: 'Review not found with the provided ID.' });
      return;
    }

    res.json({
      status: true,
      message: 'Review deleted successfully!',
      review: deletedReview,
    });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Some error occurred while deleting the review.' });
  }
};
