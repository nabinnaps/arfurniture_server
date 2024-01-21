const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class Order {
    constructor(order) {
        this.orderId = order.orderId;
        this.userId = order.userId;
        this.orderDate = order.orderDate;
        this.totalAmount = order.totalAmount;
        this.paymentId = order.paymentId;
        this.paymentStatus = order.paymentStatus || 'paid'; // Default to 'paid' if not provided
        this.deliveryStatus = order.deliveryStatus;
      }

      static async create(newOrder) {
        try {
          const createdOrder = await prisma.orders.create({
            data: {
              OrderDate: newOrder.orderDate,
              TotalAmount: newOrder.totalAmount,
              DeliveryStatus: newOrder.deliveryStatus,

              Payment: {
                connect: {
                  PaymentID: newOrder.paymentId,
                },
              },
              user: {
                connect: {
                  id: newOrder.userId,
                },
              },
            },
          });
          return createdOrder;
        } catch (err) {
          console.log('Error creating order: ', err);
          throw err;
        }
      }

  static async findById(orderId) {
    try {
      const order = await prisma.order.findUnique({
        where: {
          orderId: orderId,
        },
      });
      return order;
    } catch (err) {
      console.error('Error finding order by ID: ', err);
      throw err;
    }
  }

  static async update(updatedOrder) {
    try {
      const order = await prisma.order.update({
        where: {
          orderId: updatedOrder.orderId,
        },
        data: {
          ...updatedOrder,
          orderDate: new Date(updatedOrder.orderDate),
        },
      });
      return order;
    } catch (err) {
      console.error('Error updating order: ', err);
      throw err;
    }
  }

  static async delete(orderId) {
    try {
      const deletedOrder = await prisma.order.delete({
        where: {
          orderId: orderId,
        },
      });
      return deletedOrder;
    } catch (err) {
      console.error('Error deleting order: ', err);
      throw err;
    }
  }
}

module.exports = Order;
