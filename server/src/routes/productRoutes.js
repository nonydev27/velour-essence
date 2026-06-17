const express = require('express');
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  toggleProductVisibility,
} = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware');
const { upload } = require('../middleware/uploadMiddleware');

const router = express.Router();

// Public
router.get('/', getProducts);
router.get('/:id', getProductById);

// Admin-protected
router.post('/', protect, upload.array('images', 6), createProduct);
router.put('/:id', protect, upload.array('images', 6), updateProduct);
router.patch('/:id/visibility', protect, toggleProductVisibility);
router.delete('/:id', protect, deleteProduct);

module.exports = router;
