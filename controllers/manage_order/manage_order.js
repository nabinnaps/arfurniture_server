const Payment = require('../../models/payment/payment'); // Import your Payment model
const Order = require('../../models/order_model/order_model'); // Import your Order model
const OrderDetail = require('../../models/order_model/order_details_model'); // Import your OrderDetail model

exports.placeOrder = async (req, res) => {
  try {
    // Get necessary data from the request
    const { userId, products, totalAmount } = req.body;
    console.log(req.body);

    const payment = await Payment.create({
      userId: parseInt(userId),
      amount: totalAmount,
      paymentDate: new Date(),
      status: 'paid', // You can set the payment status as needed
    });

    // Step 2: Create an order associated with the payment
    const order = await Order.create({
      userId: userId,
      orderDate: new Date(),
      totalAmount: totalAmount,
      paymentId: payment.PaymentID, // Associate the order with the created payment
      paymentStatus: 'paid', // Set the payment status for the order
      deliveryStatus: 'pending', // Set the initial delivery status
    });

    // Step 3: For each product in the order, create an order detail
    for (const product of products) {
      await OrderDetail.create({
        orderId: order.OrderID, // Associate the order detail with the created order
        productId: product.productId,
        Quantity: product.quantity,
        Price: product.price,
      });
    }

    res.json({
      status: true,
      message: 'Order placed successfully!',
      order: order,
    });
  } catch (err) {
    console.error('Error placing order:', err);
    res.status(500).json({
      status: false,
      message: 'Error placing order.',
      error: err.message,
    });
  }
};
