const express = require('express');
const router = express.Router();
const orderController = require('../../controllers/manage_order/manage_order');

// Route to place an order
router.post('/place-order', orderController.placeOrder);

module.exports = router;
