/**
 * Generates a human-readable order ID in the format VE-YYYYMMDD-XXXX
 * e.g. VE-20260527-8821
 */
function generateOrderId() {
  const now = new Date();
  const datePart = now.toISOString().slice(0, 10).replace(/-/g, '');
  const randomPart = Math.floor(1000 + Math.random() * 9000);
  return `VE-${datePart}-${randomPart}`;
}

module.exports = { generateOrderId };
