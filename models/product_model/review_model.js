const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class Review {
  constructor(review) {
    this.id = review.id;
    this.userId = review.userId;
    this.productId = review.productId;
    this.rating = review.rating;
    this.comment = review.comment;
    this.createdAt = review.createdAt;
    this.updatedAt = review.updatedAt;
  }

  static async create(newReview) {
    try {
      const createdReview = await prisma.review.create({
        data: {
          userId: parseInt(newReview.userId),
          productId: parseInt(newReview.productId),
          rating: parseInt(newReview.rating),
          comment: newReview.comment,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });
      return createdReview;
    } catch (err) {
      console.log('Error creating review: ', err);
      throw err;
    }
  }

  static async findById(id) {
    try {
      const review = await prisma.review.findUnique({
        where: {
          id: parseInt(id),
        },
      });
      return review;
    } catch (err) {
      console.log('Error finding review by ID: ', err);
      throw err;
    }
  }

  static async update(updatedReview) {
    try {
      const review = await prisma.review.update({
        where: {
          id: parseInt(updatedReview.id),
        },
        data: {
          userId: parseInt(updatedReview.userId),
          productId: parseInt(updatedReview.productId),
          rating: parseInt(updatedReview.rating),
          comment: updatedReview.comment,
          updatedAt: new Date(),
        },
      });
      return review;
    } catch (err) {
      console.log('Error updating review: ', err);
      throw err;
    }
  }

  static async findByUserId(userId) {
    try {
      const reviews = await prisma.review.findMany({
        where: {
          userId: parseInt(userId),
        },
      });
      return reviews;
    } catch (err) {
      console.log('Error finding reviews by user ID: ', err);
      throw err;
    }
  }

  static async delete(id) {
    try {
      const deletedReview = await prisma.review.delete({
        where: {
          id: parseInt(id),
        },
      });
      return deletedReview;
    } catch (err) {
      console.log('Error deleting review: ', err);
      throw err;
    }
  }
}

module.exports = Review;
