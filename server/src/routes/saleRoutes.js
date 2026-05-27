const express = require('express');
const { getSales, createSale, toggleSale, deleteSale } = require('../controllers/saleController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', protect, getSales);
router.post('/', protect, createSale);
router.patch('/:id/toggle', protect, toggleSale);
router.delete('/:id', protect, deleteSale);

module.exports = router;
