const express = require('express');
const router = express.Router();
const productCategoryController = require('../../controllers/product_controller/category_controller.js');

// Create a new product category
router.post('/product-categories', productCategoryController.createProductCategory);

// Get a product category by ID
router.get('/product-categories/:id', productCategoryController.getProductCategoryById);

// Update a product category by ID
router.patch('/product-categories/:id', productCategoryController.updateProductCategory);

// Delete a product category by ID
router.delete('/product-categories/:id', productCategoryController.deleteProductCategory);

// Get all product categories
router.get('/product-categories', productCategoryController.getAllProductCategories);

module.exports = router;
