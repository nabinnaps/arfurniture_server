const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class Payment {
    constructor(payment) {
        this.paymentId = payment.paymentId;
        this.userId = payment.userId;
        this.amount = payment.amount;
        this.paymentDate = payment.paymentDate;
        this.status = payment.status;
      }

      static async create(newPayment) {
        try {
          const createdPayment = await prisma.payment.create({
            data: {
              Amount: newPayment.amount,
              PaymentDate: newPayment.paymentDate,
              Status: newPayment.status || 'pending', // You might want to set a default value if not provided
              user: {
                connect: {
                  id: newPayment.userId,
                },
              },
              
            },
          });
          return createdPayment;
        } catch (err) {
          console.log('Error creating payment: ', err);
          throw err;
        }
      }

  static async findById(paymentId) {
    try {
      const payment = await prisma.payment.findUnique({
        where: {
          paymentId: paymentId,
        },
      });
      return payment;
    } catch (err) {
      console.error('Error finding payment by ID: ', err);
      throw err;
    }
  }

  static async update(updatedPayment) {
    try {
      const payment = await prisma.payment.update({
        where: {
          paymentId: updatedPayment.paymentId,
        },
        data: {
          ...updatedPayment,
          paymentDate: new Date(updatedPayment.paymentDate),
        },
      });
      return payment;
    } catch (err) {
      console.error('Error updating payment: ', err);
      throw err;
    }
  }

  static async delete(paymentId) {
    try {
      const deletedPayment = await prisma.payment.delete({
        where: {
          paymentId: paymentId,
        },
      });
      return deletedPayment;
    } catch (err) {
      console.error('Error deleting payment: ', err);
      throw err;
    }
  }
}

module.exports = Payment;
