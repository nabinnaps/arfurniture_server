// wishlistItemRoutes.js

const express = require('express');
const router = express.Router();
const wishlistItemController = require('../../controllers/wishlist_controller/wishlist_items_controller');

// Define routes for WishlistItem
router.post('/wishlist-items', wishlistItemController.createWishlistItem);
router.get('/wishlist-items/:id', wishlistItemController.getWishlistItemById);
router.put('/wishlist-items/:id', wishlistItemController.updateWishlistItem);
router.delete('/wishlist-items/:id', wishlistItemController.deleteWishlistItem);

module.exports = router;
