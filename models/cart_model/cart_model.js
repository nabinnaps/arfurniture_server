const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class Cart {
  constructor(cart) {
    this.id = cart.id;
    this.userId = cart.userId;
    this.createdAt = cart.created_at;
    this.updatedAt = cart.updated_at;
  }

  static async create(userId) {
    try {
      const createdCart = await prisma.cart.create({
        data: {
          userId: parseInt(userId),
        },
      });
      return createdCart;
    } catch (err) {
      console.log('Error creating cart: ', err);
      throw err;
    }
  }

  static async update(cartId) {
    try {
      const updatedCart = await prisma.cart.update({
        where: {
          id: parseInt(cartId),
        },
        data: {
          updated_at: new Date(),
        },
      });
      return updatedCart;
    } catch (err) {
      console.log('Error updating cart: ', err);
      throw err;
    }
  }
  static async findById(cartId) {
    try {
      const cart = await prisma.cart.findUnique({
        where: {
          id: parseInt(cartId),
        },
        include: {
          cartItems: true,
        },
      });

      if (!cart) {
        return null;
      }

      return new Cart(cart);
    } catch (err) {
      console.error('Error getting cart details: ', err);
      throw err;
    }
  }
  static async delete(id) {
    try {
      const deletedCart = await prisma.cart.delete({
        where: {
          id: parseInt(id),
        },
      });
      return deletedCart;
    } catch (err) {
      console.log('Error deleting cart: ', err);
      throw err;
    }
  }
}

module.exports = Cart;
