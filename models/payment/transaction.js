const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class Transaction {
    constructor(transaction) {
        this.transactionId = transaction.transactionId;
        this.userId = transaction.userId;
        this.paymentId = transaction.paymentId;
        this.orderId = transaction.orderId;
        this.transactionDate = transaction.transactionDate;
        this.amount = transaction.amount;
        this.status = transaction.status;
      }

  static async create(newTransaction) {
    try {
      const createdTransaction = await prisma.transaction.create({
        data: newTransaction,
      });
      return createdTransaction;
    } catch (err) {
      console.error('Error creating transaction: ', err);
      throw err;
    }
  }

  static async findById(transactionId) {
    try {
      const transaction = await prisma.transaction.findUnique({
        where: {
          transactionId: transactionId,
        },
      });
      return transaction;
    } catch (err) {
      console.error('Error finding transaction by ID: ', err);
      throw err;
    }
  }

  static async update(updatedTransaction) {
    try {
      const transaction = await prisma.transaction.update({
        where: {
          transactionId: updatedTransaction.transactionId,
        },
        data: updatedTransaction,
      });
      return transaction;
    } catch (err) {
      console.error('Error updating transaction: ', err);
      throw err;
    }
  }

  static async delete(transactionId) {
    try {
      const deletedTransaction = await prisma.transaction.delete({
        where: {
          transactionId: transactionId,
        },
      });
      return deletedTransaction;
    } catch (err) {
      console.error('Error deleting transaction: ', err);
      throw err;
    }
  }
}

module.exports = Transaction;
