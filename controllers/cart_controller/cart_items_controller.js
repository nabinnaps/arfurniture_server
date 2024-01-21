const CartItem = require('../../models/cart_model/cart_item_model');
const Cart = require('../../models/cart_model/cart_model'); // Import the Cart model
const User = require('../../models/user_model/user');

exports.createCartItem = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;
        console.log(userId);
    
        // Check if the user exists
        const user = await User.findById(userId);
        if (!user) {
          return res.status(404).json({ status: false, message: 'User not found.' });
        }
    
        // Check if the user has a cart
        let cart = await Cart.findUserById(userId);
    
        // If the user doesn't have a cart, create a new one
        if (!cart) {
          cart = await Cart.create(parseInt(userId));
        }
    
        // Now, add the item to the cart
        const newCartItem = new CartItem({
          cartId: parseInt(cart.id),
          productId: productId,
          quantity: quantity,
        });
    
        const createdCartItem = await CartItem.create(newCartItem);
        res.json({
          status: true,
          message: 'Product added to cart successfully!',
          cartItem: createdCartItem,
        });
      } catch (err) {
        res.status(500).json({ status: false, message: 'Error adding to cart.', error: err.message });
      }
};

exports.getCartItemById = async (req, res) => {
  try {
    const cartItemId = req.params.id;
    const cartItem = await Cart.findById(cartItemId);

    if (!cartItem) {
      res.status(404).json({ status: false, message: 'Cart item not found with the provided ID.' });
      return;
    }

    res.json({
      status: true,
      message: 'Cart item retrieved successfully!',
      cartItem: cartItem,
    });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Error retrieving cart item.', error: err.message });
  }
};

exports.updateCartItem = async (req, res) => {
  try {
    const cartItemId = req.params.id;
    const updatedCartItemData = req.body;

    const existingCartItem = await CartItem.findById(cartItemId);

    if (!existingCartItem) {
      res.status(404).json({ status: false, message: 'Cart item not found with the provided ID.' });
      return;
    }

    const updatedCartItem = await CartItem.update({
      id: cartItemId,
      ...updatedCartItemData,
    });

    res.json({
      status: true,
      message: 'Cart item updated successfully!',
      cartItem: updatedCartItem,
    });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Error updating cart item.', error: err.message });
  }
};

exports.deleteCartItem = async (req, res) => {
  try {
    const cartItemId = req.params.id;
    const deletedCartItem = await CartItem.delete(cartItemId);

    if (!deletedCartItem) {
      res.status(404).json({ status: false, message: 'Cart item not found with the provided ID.' });
      return;
    }

    res.json({
      status: true,
      message: 'Cart item deleted successfully!',
      cartItem: deletedCartItem,
    });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Error deleting cart item.', error: err.message });
  }
};
