const express = require('express');
const { initializePayment, verifyPayment, handleWebhook } = require('../controllers/paymentController');

const router = express.Router();

router.post('/initialize', initializePayment);
router.get('/verify', verifyPayment);
// Webhook needs raw body — handled in app.js before json middleware
router.post('/webhook', handleWebhook);

module.exports = router;
