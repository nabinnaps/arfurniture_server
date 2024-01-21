// cartItemModel.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class CartItem {
  constructor(cartItem) {
    this.id = cartItem.id;
    this.cartId = cartItem.cartId;
    this.productId = cartItem.productId;
    this.quantity = cartItem.quantity;
    this.create_at = cartItem.create_at;
    this.updated_at = cartItem.updated_at;
  }

  static async create(newCartItem) {
    try {
      const createdCartItem = await prisma.cartItem.create({
        data: {
          cartId: parseInt(newCartItem.cartId),
          productId: parseInt(newCartItem.productId),
          quantity: parseInt(newCartItem.quantity),
        },
      });
      return new CartItem(createdCartItem);
    } catch (err) {
      console.log('Error creating cart item: ', err);
      throw err;
    }
  }

  static async findById(id) {
    try {
      const cartItem = await prisma.cartItem.findUnique({
        where: {
          id: parseInt(id),
        },
      });
      return new CartItem(cartItem);
    } catch (err) {
      console.log('Error finding cart item by ID: ', err);
      throw err;
    }
  }

  static async update(updatedCartItem) {
    try {
      const cartItem = await prisma.cartItem.update({
        where: {
          id: parseInt(updatedCartItem.id),
        },
        data: {
          quantity: parseInt(updatedCartItem.quantity),
          updated_at: new Date(),
        },
      });
      return new CartItem(cartItem);
    } catch (err) {
      console.log('Error updating cart item: ', err);
      throw err;
    }
  }

  static async delete(id) {
    try {
      const deletedCartItem = await prisma.cartItem.delete({
        where: {
          id: parseInt(id),
        },
      });
      return new CartItem(deletedCartItem);
    } catch (err) {
      console.log('Error deleting cart item: ', err);
      throw err;
    }
  }
}

module.exports = CartItem;
