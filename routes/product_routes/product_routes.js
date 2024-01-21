const express = require('express');
const router = express.Router();
const productController = require('../../controllers/product_controller/product_controller');
const multer = require('multer');
const path = require('path');
const auth = require('../../middleware/check_auth');

var storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, './assets/images/products/');
  },
  filename: (req, file, callBack) => {
    callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
});

var upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
});

router.post('/product', auth, upload.single('image'), productController.createProduct);
router.get('/product/:id', auth, productController.getProductById);
router.patch('/product/:id', auth, upload.single('image'), productController.updateProduct);
router.delete('/product/:id', auth, productController.deleteProduct);
router.get('/', productController.getAllProducts);

module.exports = router;
