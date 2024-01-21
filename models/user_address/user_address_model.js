const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class UserAddress {
  constructor(userAddress) {
    this.id = userAddress.id;
    this.city = userAddress.city;
    this.street = userAddress.street;
  }

  static async create(newAddress, callback) {
    try {
      const createdAddress = await prisma.userAddress.create({
        data: {
          city: newAddress.city,
          street: newAddress.street,
        },
      });
      return createdAddress;
    } catch (err) {
      console.log('error: ', err);
      throw err;
    }
  }

  static async findById(id, callback) {
    try {
      const address = await prisma.userAddress.findUnique({
        where: {
          id: id,
        },
      });
      return address;
    } catch (err) {
      console.log('error: ', err);
      throw err;
    }
  }

  static async update(updatedAddress, callback) {
    try {
      const address = await prisma.userAddress.update({
        where: {
          id: updatedAddress.id,
        },
        data: {
          city: updatedAddress.city,
          street: updatedAddress.street,
          // Add other fields here for update if needed
        },
      });
      return address;
    } catch (err) {
      console.log('error: ', err);
      throw err;
    }
  }

  static async findByCity(city, callback) {
    try {
      const address = await prisma.userAddress.findFirst({
        where: {
          city: city,
        },
      });
      return address;
    } catch (err) {
      console.log('Error finding address by city: ', err);
      throw err;
    }
  }
}

module.exports = UserAddress;
