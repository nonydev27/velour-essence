const axios = require('axios');

const TERMII_BASE = 'https://v3.api.termii.com/api';

/**
 * Send an SMS via Termii
 * @param {string} to - Recipient phone number (e.g. "08012345678" or "2348012345678")
 * @param {string} message - SMS message body
 */
async function sendSMS(to, message) {
  // Normalize Ghanaian numbers to international format
  let phone = to.trim().replace(/\s+/g, '');
  if (phone.startsWith('0')) phone = '233' + phone.slice(1);

  try {
    const { data } = await axios.post(`${TERMII_BASE}/sms/send`, {
      to: phone,
      from: process.env.TERMII_SENDER_ID || 'VelourEss',
      sms: message,
      type: 'plain',
      api_key: process.env.TERMII_API_KEY,
      channel: 'generic',
    });

    console.log('SMS sent:', data);
    return data;
  } catch (err) {
    // Log but don't crash the order flow if SMS fails
    console.error('SMS send failed:', err.response?.data || err.message);
  }
}

/**
 * Build and send the order confirmation SMS
 * @param {object} order
 */
async function sendOrderConfirmationSMS(order) {
  const itemsList = JSON.parse(JSON.stringify(order.items))
    .map((i) => `${i.name} x${i.qty}`)
    .join(', ');

  const message =
    `Hi ${order.customerName}, your Velour Essence order has been placed!\n` +
    `Order ID: ${order.orderId}\n` +
    `Items: ${itemsList}\n` +
    `Total: GH₵${Number(order.totalAmount).toLocaleString('en-GH')}\n` +
    `We'll deliver to ${order.school} — ${order.hostel}.\n` +
    `Questions? Reply to this message.`;

  return sendSMS(order.phone, message);
}

module.exports = { sendSMS, sendOrderConfirmationSMS };
