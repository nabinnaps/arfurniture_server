// wishlistItemModel.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class WishlistItem {
  constructor(wishlistItem) {
    this.WishlistItemID = wishlistItem.WishlistItemID;
    this.WishlistID = wishlistItem.WishlistID;
    this.ProductID = wishlistItem.ProductID;
    this.created_at = wishlistItem.created_at;
    this.updated_at = wishlistItem.updated_at;
  }

  static async create(newWishlistItem) {
    try {
      const createdWishlistItem = await prisma.wishlistItem.create({
        data: {
          WishlistID: parseInt(newWishlistItem.WishlistID),
          ProductID: parseInt(newWishlistItem.ProductID),
      
        },

      });
      return new WishlistItem(createdWishlistItem);
    } catch (err) {
      console.log('Error creating wishlist item: ', err);
      throw err;
    }
  }


  static async findById(WishlistItemID) {
    try {
      const wishlistItem = await prisma.wishlistItem.findUnique({
        where: {
          WishlistItemID: parseInt(WishlistItemID),
        },
      });
      return wishlistItem;
    } catch (err) {
      console.log('Error finding wishlist item by ID: ', err);
      throw err;
    }
  }

  static async delete(WishlistItemID) {
    try {
      const deletedWishlistItem = await prisma.wishlistItem.delete({
        where: {
          WishlistItemID: parseInt(WishlistItemID),
        },
      });
      return deletedWishlistItem;
    } catch (err) {
      console.log('Error deleting wishlist item: ', err);
      throw err;
    }
  }
}

module.exports = WishlistItem;
