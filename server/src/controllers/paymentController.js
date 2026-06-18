const { prisma } = require('../utils/prisma');
const crypto = require('crypto');

const { initializeTransaction, verifyTransaction } = require('../services/paystackService');
const { sendOrderConfirmationSMS } = require('../services/smsService');
const { sendOrderNotification } = require('../services/emailService');
const { generateOrderId } = require('../utils/generateOrderId');


/**
 * POST /api/payment/initialize
 * Body: { customerName, phone, school, hostel, items, totalAmount }
 */
async function initializePayment(req, res, next) {
  try {
    const { customerName, phone, school, hostel, items, totalAmount } = req.body;

    if (!customerName || !phone || !school || !hostel || !items || !totalAmount) {
      return res.status(400).json({ success: false, message: 'All checkout fields are required' });
    }

    // Use phone as pseudo-email for Paystack (no email field in checkout)
    const email = `${phone.replace(/\D/g, '')}@velour.com`;

    // Unique reference for this transaction
    const reference = `VE-${Date.now()}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;

    const callbackUrl = `${process.env.CLIENT_URL}/order-confirmation`;

    const { authorizationUrl } = await initializeTransaction({
      email,
      amountKobo: Math.round(parseFloat(totalAmount) * 100),
      reference,
      callbackUrl,
      metadata: { customerName, phone, school, hostel, items: JSON.stringify(items) },
    });

    // Record the pending payment attempt for admin visibility
    await prisma.payment.create({
      data: { reference, customerName, phone, amount: parseFloat(totalAmount), status: 'PENDING' },
    }).catch(() => {});

    res.json({ success: true, authorizationUrl, reference });
  } catch (err) {
    next(err);
  }
}

/**
 * GET /api/payment/verify?reference=xxx
 * Called by frontend after Paystack redirect
 */
async function verifyPayment(req, res, next) {
  try {
    const { reference } = req.query;
    if (!reference) {
      return res.status(400).json({ success: false, message: 'reference is required' });
    }

    const txData = await verifyTransaction(reference);

    if (txData.status !== 'success') {
      return res.status(400).json({ success: false, message: 'Payment not successful' });
    }

    // Idempotent — don't create duplicate orders
    const existingOrder = await prisma.order.findUnique({ where: { paystackRef: reference } });
    if (existingOrder) {
      return res.json({ success: true, data: existingOrder });
    }

    const meta = txData.metadata || {};
    const items = meta.items ? JSON.parse(meta.items) : [];

    const order = await prisma.order.create({
      data: {
        orderId: generateOrderId(),
        customerName: meta.customerName || 'Customer',
        phone: meta.phone || '',
        school: meta.school || '',
        hostel: meta.hostel || '',
        items,
        totalAmount: txData.amount / 100,
        status: 'CONFIRMED',
        paystackRef: reference,
      },
    });

    // Reduce product stock for each item
    for (const item of items) {
      if (item.productId) {
        await prisma.product.update({
          where: { id: item.productId },
          data: { stock: { decrement: item.qty || 1 } },
        }).catch(() => {}); // don't fail order if stock update fails
      }
    }

    // Mark payment as SUCCESS and link to order
    await prisma.payment.upsert({
      where: { reference },
      update: { status: 'SUCCESS', orderId: order.orderId },
      create: { reference, customerName: meta.customerName || 'Customer', phone: meta.phone || '', amount: txData.amount / 100, status: 'SUCCESS', orderId: order.orderId },
    }).catch(() => {});

    // Fire-and-forget notifications
    sendOrderConfirmationSMS(order).catch(() => {});
    sendOrderNotification(order).catch(() => {});

    res.json({ success: true, data: order });
  } catch (err) {
    next(err);
  }
}

/**
 * POST /api/payment/webhook
 * Paystack webhook — backup to verify endpoint
 */
async function handleWebhook(req, res, next) {
  try {
    // req.body is a raw Buffer here (express.raw middleware set in app.js)
    const hash = crypto
      .createHmac('sha512', process.env.PAYSTACK_SECRET_KEY)
      .update(req.body)
      .digest('hex');

    if (hash !== req.headers['x-paystack-signature']) {
      return res.status(400).json({ success: false, message: 'Invalid signature' });
    }

    // Acknowledge immediately
    res.sendStatus(200);

    const event = JSON.parse(req.body);
    if (event.event !== 'charge.success') return;

    const txData = event.data;
    const reference = txData.reference;

    const existingOrder = await prisma.order.findUnique({ where: { paystackRef: reference } });
    if (existingOrder) return; // Already processed

    const meta = txData.metadata || {};
    const items = meta.items ? JSON.parse(meta.items) : [];

    const order = await prisma.order.create({
      data: {
        orderId: generateOrderId(),
        customerName: meta.customerName || 'Customer',
        phone: meta.phone || '',
        school: meta.school || '',
        hostel: meta.hostel || '',
        items,
        totalAmount: txData.amount / 100,
        status: 'CONFIRMED',
        paystackRef: reference,
      },
    });

    for (const item of items) {
      if (item.productId) {
        await prisma.product.update({
          where: { id: item.productId },
          data: { stock: { decrement: item.qty || 1 } },
        }).catch(() => {});
      }
    }

    // Mark payment as SUCCESS via webhook path
    await prisma.payment.upsert({
      where: { reference },
      update: { status: 'SUCCESS', orderId: order.orderId },
      create: { reference, customerName: meta.customerName || 'Customer', phone: meta.phone || '', amount: txData.amount / 100, status: 'SUCCESS', orderId: order.orderId },
    }).catch(() => {});

    sendOrderConfirmationSMS(order).catch(() => {});
    sendOrderNotification(order).catch(() => {});
  } catch (err) {
    console.error('Webhook error:', err);
  }
}

module.exports = { initializePayment, verifyPayment, handleWebhook };
