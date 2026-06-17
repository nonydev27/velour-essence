const express = require('express');
const { login, seedAdmin, getDashboardStats, getPayments } = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/login', login);
router.post('/seed', seedAdmin); // one-time dev helper
router.get('/dashboard', protect, getDashboardStats);
router.get('/payments', protect, getPayments);

module.exports = router;
