const express = require('express');
const { login, seedAdmin, getDashboardStats } = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/login', login);
router.post('/seed', seedAdmin); // one-time dev helper
router.get('/dashboard', protect, getDashboardStats);

module.exports = router;
