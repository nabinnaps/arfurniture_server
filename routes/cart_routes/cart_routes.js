const express = require('express');
const router = express.Router();
const cartItemController = require('../../controllers/cart_controller/cart_items_controller');
const auth = require('../../middleware/check_auth');

router.post('/cartitem', cartItemController.createCartItem);
router.patch('/cartitem/update-quantity/:id',auth, cartItemController.updateCartItem);
router.delete('/cartitem/:id',auth,cartItemController.deleteCartItem);
router.get('/cartitem/:id', cartItemController.getCartItemById);

module.exports = router;
