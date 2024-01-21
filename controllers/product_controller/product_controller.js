const Product = require('../../models/product_model/product_model.js');

exports.createProduct = async (req, res) => {
  try {
    if (!req.body) {
      res.status(400).send({ message: 'Content can not be empty!' });
      return;
    }

    const { productName, description, price, size, categoryId, quantityAvailable, image } = req.body;
    const categoryIdAsInt = parseInt(categoryId);
    const newProduct = new Product({
      productName: productName,
      description: description,
      price: price,
      size: size,
      categoryId: categoryIdAsInt,
      quantityAvailable: quantityAvailable,
      image: image,
    });

    const createdProduct = await Product.create(newProduct);
    res.json({
      status: true,
      message: 'Product created successfully!',
      product: createdProduct,
    });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Some error occurred while creating the product.' });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const product = await Product.findById(productId);

    if (!product) {
      res.status(404).json({ status: false, message: 'Product not found with the provided ID.' });
      return;
    }

    res.json({
      status: true,
      message: 'Product retrieved successfully!',
      product: product,
    });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Some error occurred while retrieving the product.' });
  }
};
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.getAll();
    res.json({
      status: true,
      message: 'Products retrieved successfully!',
      products: products,
    });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Some error occurred while retrieving products.' });
  }
};
exports.updateProduct = async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const updatedProductData = req.body;

    const existingProduct = await Product.findById(productId);

    if (!existingProduct) {
      res.status(404).json({ status: false, message: 'Product not found with the provided ID.' });
      return;
    }

    const updatedProduct = await Product.update({
      id: productId,
      ...updatedProductData,
    });

    res.json({
      status: true,
      message: 'Product updated successfully!',
      product: updatedProduct,
    });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Some error occurred while updating the product.' });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const deletedProduct = await Product.delete(productId);

    if (!deletedProduct) {
      res.status(404).json({ status: false, message: 'Product not found with the provided ID.' });
      return;
    }

    res.json({
      status: true,
      message: 'Product deleted successfully!',
      product: deletedProduct,
    });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Some error occurred while deleting the product.' });
  }
};
