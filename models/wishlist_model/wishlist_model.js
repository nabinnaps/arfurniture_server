// wishlistModel.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class Wishlist {
  constructor(wishlist) {
    this.wishlistId = wishlist.wishlistId;
    this.UserID = wishlist.UserID;
    this.created_at = wishlist.created_at;
    this.updated_at = wishlist.updated_at;
  }

  static async create(id, callback) {
    try {
      const createdWishlist = await prisma.wishlist.create({
        data: {
          UserID : id,
          created_at:new Date(),
          updated_at:new Date()

        },
      });
      return createdWishlist;
    } catch (err) {
      console.log('Error creating wishlist: ', err);
      throw err;
    }
  }

  static async findUserById(userId) {
    try {
        // Find wishlist by userId
        const wishlist = await prisma.wishlist.findFirst({
            where: {
              UserID: parseInt(userId),
            },
        });

        return wishlist;
    } catch (err) {
        console.log('Error finding wishlist by ID: ', err);
        throw err;
    }
}
  static async findById(userId) {
    try {
        // Find wishlist by userId
        const wishlist = await prisma.wishlist.findFirst({
            where: {
              UserID: parseInt(userId),
            },
        });

        console.log(wishlist.wishlistId);
        if (!wishlist) {
            return null; // Return null if wishlist not found
        }

        // Find wishlistItems for the found wishlist
        const wishlistWithItems = await prisma.wishlist.findFirst({
            where: {
                wishlistId: wishlist.wishlistId,
            },
            include: {
                wishlistItems: true,
            },
        });

        return wishlistWithItems;
    } catch (err) {
        console.log('Error finding wishlist by ID: ', err);
        throw err;
    }
}


  // Add other CRUD operations as needed

  static async delete(wishlistId) {
    try {
      const deletedWishlist = await prisma.wishlist.delete({
        where: {
          wishlistId: wishlistId,
        },
      });
      return deletedWishlist;
    } catch (err) {
      console.log('Error deleting wishlist: ', err);
      throw err;
    }
  }
}

module.exports = Wishlist;
