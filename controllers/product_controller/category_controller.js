const ProductCategory = require('../../models/product_model/category_model.js');

exports.createProductCategory = async (req, res) => {
  try {
    if (!req.body) {
      res.status(400).send({ message: 'Content can not be empty!' });
      return;
    }
    const { category } = req.body;

    const existingCategory = await ProductCategory.findByCategory(category);

    if (existingCategory) {
      res.status(403).json({ status: false, message: 'Categories already exists.' });
      return;
    }
    const newCategory = new ProductCategory({
      category: category,
    });
    
    const createdCategory = await ProductCategory.create(newCategory);
    res.json({
      status: true,
      message: 'Product category created successfully!',
      category: createdCategory,
    });
  } catch (err) {
    res.status(500).json({ 
      status: false, 
      message: 'Some error occurred while creating the product category.' });
  }
};

exports.getProductCategoryById = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const category = await ProductCategory.findById(categoryId);

    if (!category) {
      res.status(404).json({ status: false, message: 'Product category not found with the provided ID.' });
      return;
    }

    res.json({
      status: true,
      message: 'Product category retrieved successfully!',
      category: category,
    });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Some error occurred while retrieving the product category.' });
  }
};

exports.updateProductCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const updatedCategoryData = req.body;

    const existingCategory = await ProductCategory.findById(categoryId);

    if (!existingCategory) {
      res.status(404).json({ status: false, message: 'Product category not found with the provided ID.' });
      return;
    }

    const updatedCategory = await ProductCategory.update({
      id: categoryId,
      ...updatedCategoryData,
    });

    res.json({
      status: true,
      message: 'Product category updated successfully!',
      category: updatedCategory,
    });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Some error occurred while updating the product category.' });
  }
};

exports.deleteProductCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const deletedCategory = await ProductCategory.delete(categoryId);

    if (!deletedCategory) {
      res.status(404).json({ status: false, message: 'Product category not found with the provided ID.' });
      return;
    }

    res.json({
      status: true,
      message: 'Product category deleted successfully!',
      category: deletedCategory,
    });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Some error occurred while deleting the product category.' });
  }
};

exports.getAllProductCategories = async (req, res) => {
    try {
      const categories = await ProductCategory.getAllCategories();
  
      res.json({
        status: true,
        message: 'All product categories retrieved successfully!',
        categories: categories,
      });
    } catch (err) {
      res.status(500).json({ status: false, message: 'Some error occurred while retrieving all product categories.' });
    }
  };