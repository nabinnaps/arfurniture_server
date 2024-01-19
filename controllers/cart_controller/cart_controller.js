const Cart = require('../../models/cart_model/cart_model');

exports.createCart = async (req, res) => {
  try {
    const newCart = {
      userId: req.body.userId,
    };

    const createdCart = await Cart.create(newCart);
    res.json({
      status: true,
      message: 'Cart created successfully!',
      cart: createdCart,
    });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Error creating cart.', error: err.message });
  }
};

exports.getCartById = async (req, res) => {
  try {
    const cartId = req.params.id;
    const cart = await Cart.findById(cartId);

    if (!cart) {
      res.status(404).json({ status: false, message: 'Cart not found with the provided ID.' });
      return;
    }

    res.json({
      status: true,
      message: 'Cart and Cart Item retrieved successfully!',
      cart: cart,
    });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Error retrieving cart.', error: err.message });
  }
};

exports.updateCart = async (req, res) => {
  try {
    const cartId = req.params.id;
    const updatedCartData = req.body;

    const existingCart = await Cart.findById(cartId);

    if (!existingCart) {
      res.status(404).json({ status: false, message: 'Cart not found with the provided ID.' });
      return;
    }

    const updatedCart = await Cart.update({
      id: cartId,
      ...updatedCartData,
    });

    res.json({
      status: true,
      message: 'Cart updated successfully!',
      cart: updatedCart,
    });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Error updating cart.', error: err.message });
  }
};

exports.deleteCart = async (req, res) => {
  try {
    const cartId = req.params.id;
    const deletedCart = await Cart.delete(cartId);

    if (!deletedCart) {
      res.status(404).json({ status: false, message: 'Cart not found with the provided ID.' });
      return;
    }

    res.json({
      status: true,
      message: 'Cart deleted successfully!',
      cart: deletedCart,
    });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Error deleting cart.', error: err.message });
  }
};
