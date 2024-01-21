const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class ProductCategory {
  constructor(category) {
    this.id = category.id;
    this.category = category.category;
  }

  
    static async create(newCategory) {
      try {
        const existingCategory = await prisma.productCategory.findUnique({
          where: {
            category: newCategory.category,
          },
        });
  
        const createdCategory = await prisma.productCategory.create({
          data: {
            category: newCategory.category,
          },
        });
        return createdCategory;
  
      } catch (err) {
        console.log('Error creating product category: ', err.message);
        throw err;
      }
    }
 

  static async findById(id) {
    try {
      const category = await prisma.productCategory.findUnique({
        where: {
          id: parseInt(id),
        },
      });
      return category;
    } catch (err) {
      console.log('Error finding product category by ID: ', err);
      throw err;
    }
  }
  static async findByCategory(categories) {
    try {
      const category = await prisma.productCategory.findUnique({
        where: {
          category: categories,
        },
      });
      return category;
    } catch (err) {
      console.log('Error finding product category by category: ', err);
      throw err;
    }
  }

  static async update(updatedCategory) {
    try {
      const category = await prisma.productCategory.update({
        where: {
          id: parseInt(updatedCategory.id),
        },
        data: {
          category: updatedCategory.category,
        },
      });
      return category;
    } catch (err) {
      console.log('Error updating product category: ', err);
      throw err;
    }
  }

  static async delete(id) {
    try {
      const deletedCategory = await prisma.productCategory.delete({
        where: {
          id: parseInt(id),
        },
      });
      return deletedCategory;
    } catch (err) {
      console.log('Error deleting product category: ', err);
      throw err;
    }
  }
  static async getAllCategories() {
  try {
    const categories = await prisma.productCategory.findMany();
    return categories;
  } catch (err) {
    console.log('Error retrieving all product categories: ', err);
    throw err;
  }
}
}

module.exports = ProductCategory;
