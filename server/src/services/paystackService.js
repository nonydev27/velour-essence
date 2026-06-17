const axios = require('axios');

const PAYSTACK_BASE = 'https://api.paystack.co';

const headers = () => ({
  Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
  'Content-Type': 'application/json',
});

/**
 * Initialize a Paystack transaction
 * @param {object} params
 * @param {string} params.email
 * @param {number} params.amountPesewas - Amount in pesewas (GHS × 100)
 * @param {string} params.reference - Unique transaction reference
 * @param {string} params.callbackUrl - URL Paystack redirects to after payment
 * @param {object} params.metadata - Additional metadata to attach
 * @returns {Promise<{authorizationUrl: string, reference: string}>}
 */
async function initializeTransaction({ email, amountKobo: amountPesewas, reference, callbackUrl, metadata = {} }) {
  const { data } = await axios.post(
    `${PAYSTACK_BASE}/transaction/initialize`,
    { email, amount: amountPesewas, reference, callback_url: callbackUrl, metadata, currency: 'GHS' },
    { headers: headers() }
  );

  if (!data.status) throw new Error(data.message || 'Paystack initialization failed');

  return {
    authorizationUrl: data.data.authorization_url,
    reference: data.data.reference,
  };
}

/**
 * Verify a Paystack transaction by reference
 * @param {string} reference
 * @returns {Promise<object>} Paystack transaction data
 */
async function verifyTransaction(reference) {
  const { data } = await axios.get(
    `${PAYSTACK_BASE}/transaction/verify/${encodeURIComponent(reference)}`,
    { headers: headers() }
  );

  if (!data.status) throw new Error(data.message || 'Paystack verification failed');

  return data.data;
}

module.exports = { initializeTransaction, verifyTransaction };
