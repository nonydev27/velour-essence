const nodemailer = require('nodemailer');

function getTransporter() {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
}

/**
 * Send new order notification to all admin emails
 * @param {object} order - Prisma order object
 */
async function sendOrderNotification(order) {
  const adminEmails = process.env.ADMIN_EMAILS?.split(',').map((e) => e.trim()).filter(Boolean);
  if (!adminEmails?.length || !process.env.EMAIL_USER || !process.env.EMAIL_PASS) return;

  const items = Array.isArray(order.items) ? order.items : [];

  const itemRows = items.map((item) =>
    `<tr>
      <td style="padding:8px 12px;border-bottom:1px solid #eee;">${item.name}</td>
      <td style="padding:8px 12px;border-bottom:1px solid #eee;text-align:center;">${item.qty}</td>
      <td style="padding:8px 12px;border-bottom:1px solid #eee;text-align:right;">GHS ${Number(item.price).toFixed(2)}</td>
      <td style="padding:8px 12px;border-bottom:1px solid #eee;text-align:right;">GHS ${(item.qty * item.price).toFixed(2)}</td>
    </tr>`
  ).join('');

  const html = `
  <div style="font-family:sans-serif;max-width:600px;margin:auto;color:#2c2c2c;">
    <div style="background:#2c2c2c;padding:24px 32px;">
      <h1 style="color:#fff;font-size:20px;margin:0;">New Order — Velour Essence</h1>
    </div>
    <div style="padding:32px;">
      <p style="margin:0 0 24px;font-size:15px;">A new order has been placed. Here are the details:</p>

      <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
        <tr><td style="padding:6px 0;color:#888;width:140px;">Order ID</td><td style="padding:6px 0;font-weight:600;">${order.orderId}</td></tr>
        <tr><td style="padding:6px 0;color:#888;">Customer</td><td style="padding:6px 0;">${order.customerName}</td></tr>
        <tr><td style="padding:6px 0;color:#888;">Phone</td><td style="padding:6px 0;">${order.phone}</td></tr>
        <tr><td style="padding:6px 0;color:#888;">School</td><td style="padding:6px 0;">${order.school}</td></tr>
        <tr><td style="padding:6px 0;color:#888;">Hostel / Address</td><td style="padding:6px 0;">${order.hostel}</td></tr>
        <tr><td style="padding:6px 0;color:#888;">Date</td><td style="padding:6px 0;">${new Date(order.createdAt).toLocaleString('en-GB')}</td></tr>
        <tr><td style="padding:6px 0;color:#888;">Paystack Ref</td><td style="padding:6px 0;font-family:monospace;font-size:13px;">${order.paystackRef}</td></tr>
      </table>

      <h3 style="font-size:14px;text-transform:uppercase;letter-spacing:.05em;color:#888;margin-bottom:8px;">Items Ordered</h3>
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        <thead>
          <tr style="background:#f4f5f7;">
            <th style="padding:8px 12px;text-align:left;font-weight:600;">Item</th>
            <th style="padding:8px 12px;text-align:center;font-weight:600;">Qty</th>
            <th style="padding:8px 12px;text-align:right;font-weight:600;">Unit Price</th>
            <th style="padding:8px 12px;text-align:right;font-weight:600;">Subtotal</th>
          </tr>
        </thead>
        <tbody>${itemRows}</tbody>
      </table>

      <div style="text-align:right;padding:16px 12px 0;font-size:16px;font-weight:700;border-top:2px solid #2c2c2c;margin-top:8px;">
        Total: GHS ${Number(order.totalAmount).toFixed(2)}
      </div>

      <div style="margin-top:32px;padding:16px;background:#f4f5f7;border-radius:8px;text-align:center;">
        <a href="${process.env.CLIENT_URL}/admin/orders" style="background:#2c2c2c;color:#fff;padding:12px 28px;border-radius:6px;text-decoration:none;font-size:14px;font-weight:600;">
          View in Admin Dashboard
        </a>
      </div>
    </div>
    <div style="padding:16px 32px;border-top:1px solid #eee;font-size:12px;color:#aaa;text-align:center;">
      Velour Essence Admin Notifications
    </div>
  </div>`;

  await getTransporter().sendMail({
    from: `"Velour Essence" <${process.env.EMAIL_USER}>`,
    to: adminEmails.join(', '),
    subject: `New Order ${order.orderId} — ${order.customerName}`,
    html,
  });
}

module.exports = { sendOrderNotification };
