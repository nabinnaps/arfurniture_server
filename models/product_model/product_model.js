const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class Product {
  constructor(product) {
    this.id = product.id;
    this.productName = product.productName;
    this.description = product.description;
    this.price = product.price;
    this.size = product.size;
    this.categoryId = product.categoryId;
    this.quantityAvailable = product.quantityAvailable;
    this.image = product.image;
    this.createdAt = product.createdAt;
    this.updatedAt = product.updatedAt;
  }

  static async create(newProduct, callback) {
    try {
      const createdProduct = await prisma.product.create({
        data: {
          productName: newProduct.productName,
          description: newProduct.description,
          price: newProduct.price,
          size: newProduct.size,
          categoryId: newProduct.categoryId,
          quantityAvailable: newProduct.quantityAvailable,
          image: newProduct.image,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });
      return createdProduct;
    } catch (err) {
      console.log('error: ', err);
      throw err;
    }
  }

  static async findById(id, callback) {
    try {
      const product = await prisma.product.findUnique({
        where: {
          id: id,
        },
      });
      return product;
    } catch (err) {
      console.log('error: ', err);
      throw err;
    }
  }

  static async update(updatedProduct, callback) {
    try {
      const product = await prisma.product.update({
        where: {
          id: updatedProduct.id,
        },
        data: {
          productName: updatedProduct.productName,
          description: updatedProduct.description,
          price: updatedProduct.price,
          size: updatedProduct.size,
          categoryId: parseInt(updatedProduct.categoryId),
          quantityAvailable: updatedProduct.quantityAvailable,
          image: updatedProduct.image,
          updatedAt: new Date(),
        },
      });
      return product;
    } catch (err) {
      console.log('error: ', err);
      throw err;
    }
  }

  static async findByProductName(productName, callback) {
    try {
      const product = await prisma.product.findFirst({
        where: {
          productName: productName,
        },
      });
      return product;
    } catch (err) {
      console.log('Error finding product by name: ', err);
      throw err;
    }
  }

  static async delete(id, callback) {
    try {
      const deletedProduct = await prisma.product.delete({
        where: {
          id: id,
        },
      });
      return deletedProduct;
    } catch (err) {
      console.log('Error deleting product: ', err);
      throw err;
    }
  }
  static async getAll(callback) {
    try {
      const products = await prisma.product.findMany({
        include: {
          productCategory: true,
          reviews: true,
        },
      });
      return products;
    } catch (err) {
      console.log('Error getting all products: ', err);
      throw err;
    }
  }

}

module.exports = Product;
