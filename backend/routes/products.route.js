const express = require('express');
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  deleteProduct,
  updateProduct,
  filterProducts,
} = require('../controllers/products.controller');
const AuthCheck = require('../middlewares/auth.middleware');

// Create a new product
router.post('/create', createProduct);

// Get all products
router.get('/all', getAllProducts);

// Delete a product by ID
router.delete('/:id', deleteProduct);

// Update a product by ID
router.put('/:id', updateProduct);

router.get('/filters', filterProducts);

module.exports = router;
