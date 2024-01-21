const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class OrderDetail {
    constructor(orderDetail) {
        this.orderDetailId = orderDetail.orderDetailId;
        this.orderId = orderDetail.orderId;
        this.productId = orderDetail.productId;
        this.Quantity = orderDetail.Quantity;
        this.Price = orderDetail.Price;
      }

  static async create(newOrderDetail) {
    try {
      const createdOrderDetail = await prisma.orderDetails.create({
      
        data: {
            Quantity: newOrderDetail.Quantity,
            Price: newOrderDetail.Price,
            Order: {
                connect: {
                  OrderID: newOrderDetail.orderId,
                },
              },
              Product: {
                connect: {
                  id: newOrderDetail.productId,
                },
              },
          }
      });
      return createdOrderDetail;
    } catch (err) {
      console.error('Error creating order detail: ', err);
      throw err;
    }
  }

  static async findById(orderDetailId) {
    try {
      const orderDetail = await prisma.orderDetail.findUnique({
        where: {
          orderDetailId: orderDetailId,
        },
      });
      return orderDetail;
    } catch (err) {
      console.error('Error finding order detail by ID: ', err);
      throw err;
    }
  }

  static async update(updatedOrderDetail) {
    try {
      const orderDetail = await prisma.orderDetail.update({
        where: {
          orderDetailId: updatedOrderDetail.orderDetailId,
        },
        data: updatedOrderDetail,
      });
      return orderDetail;
    } catch (err) {
      console.error('Error updating order detail: ', err);
      throw err;
    }
  }

  static async delete(orderDetailId) {
    try {
      const deletedOrderDetail = await prisma.orderDetail.delete({
        where: {
          orderDetailId: orderDetailId,
        },
      });
      return deletedOrderDetail;
    } catch (err) {
      console.error('Error deleting order detail: ', err);
      throw err;
    }
  }
}

module.exports = OrderDetail;
