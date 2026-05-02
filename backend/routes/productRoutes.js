const express = require('express');
const {
  createProduct,
  getAllProducts,
  getCategoryProducts,
  getTsProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} = require('../controller/productController');
const authenticateToken = require('../middleware/authMiddleware');
const { isAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/add', authenticateToken, isAdmin, createProduct);
router.get('/get', getAllProducts);
router.get('/get/ts', getTsProducts);              // top selling products
router.get('/get/:cat', getCategoryProducts);      // must come AFTER /get/ts
router.get('/get/single/:id', getSingleProduct);
router.put('/update/:id', authenticateToken, isAdmin, updateProduct);
router.delete('/delete/:id', authenticateToken, isAdmin, deleteProduct);

module.exports = router;