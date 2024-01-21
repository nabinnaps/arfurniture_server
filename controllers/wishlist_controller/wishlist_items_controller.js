// wishlistItemController.js

const WishlistItem = require('../../models/wishlist_model/wishlist_items_models');
const Wishlist = require('../../models/wishlist_model/wishlist_model'); // Import the Wishlist and WishlistItem models
const User = require('../../models/user_model/user');

exports.createWishlistItem = async (req, res) => {
    try {
        const { userId, productId } = req.body;

        // Check if the user exists
        const user = await User.findById(userId);
        if (!user) {
          return res.status(404).json({ status: false, message: 'User not found.' });
        }

        // Check if the user has a wishlist
        let wishlist = await Wishlist.findUserById(userId);

        // If the user doesn't have a wishlist, create a new one
        if (!wishlist) {
          wishlist = await Wishlist.create(userId);
        }

        const newWishlistItem = new WishlistItem({
          WishlistID: wishlist.wishlistId,
          ProductID: productId,
        });

        const createdWishlistItem = await WishlistItem.create(newWishlistItem);
        res.json({
          status: true,
          message: 'Product added to wishlist successfully!',
          wishlistItem: createdWishlistItem,
        });
      } catch (err) {
        res.status(500).json({ status: false, message: 'Error adding to wishlist.', error: err.message });
      }
};

exports.getWishlistItemById = async (req, res) => {
  try {
    const wishlistItemId = req.params.id;
    const wishlistItem = await Wishlist.findById(wishlistItemId);

    if (!wishlistItem) {
      res.status(404).json({ status: false, message: 'Wishlist item not found with the provided ID.' });
      return;
    }

    res.json({
      status: true,
      message: 'Wishlist item retrieved successfully!',
      wishlistItem: wishlistItem,
    });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Error retrieving wishlist item.', error: err.message });
  }
};

exports.updateWishlistItem = async (req, res) => {
  try {
    const wishlistItemId = req.params.id;
    const updatedWishlistItemData = req.body;

    const existingWishlistItem = await WishlistItem.findById(wishlistItemId);

    if (!existingWishlistItem) {
      res.status(404).json({ status: false, message: 'Wishlist item not found with the provided ID.' });
      return;
    }

    const updatedWishlistItem = await WishlistItem.update({
      id: wishlistItemId,
      ...updatedWishlistItemData,
    });

    res.json({
      status: true,
      message: 'Wishlist item updated successfully!',
      wishlistItem: updatedWishlistItem,
    });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Error updating wishlist item.', error: err.message });
  }
};

exports.deleteWishlistItem = async (req, res) => {
  try {
    const wishlistItemId = req.params.id;
    const deletedWishlistItem = await WishlistItem.delete(wishlistItemId);

    if (!deletedWishlistItem) {
      res.status(404).json({ status: false, message: 'Wishlist item not found with the provided ID.' });
      return;
    }

    res.json({
      status: true,
      message: 'Wishlist item deleted successfully!',
      wishlistItem: deletedWishlistItem,
    });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Error deleting wishlist item.', error: err.message });
  }
};
