const { prisma } = require('../utils/prisma');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



/**
 * POST /api/admin/login
 */
async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    const admin = await prisma.admin.findUnique({ where: { email } });
    if (!admin) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const match = await bcrypt.compare(password, admin.passwordHash);
    if (!match) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: admin.id, email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      token,
      admin: { id: admin.id, email: admin.email },
    });
  } catch (err) {
    next(err);
  }
}

/**
 * POST /api/admin/seed  (dev helper — creates first admin account)
 * Body: { email, password }
 */
async function seedAdmin(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password required' });
    }

    const existing = await prisma.admin.findUnique({ where: { email } });
    if (existing) {
      return res.status(409).json({ success: false, message: 'Admin already exists' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const admin = await prisma.admin.create({ data: { email, passwordHash } });

    res.status(201).json({ success: true, message: 'Admin created', id: admin.id });
  } catch (err) {
    next(err);
  }
}

/**
 * GET /api/admin/dashboard
 * Returns quick stats for the admin dashboard
 */
async function getDashboardStats(req, res, next) {
  try {
    const [totalOrders, pendingOrders, confirmedOrders, deliveredOrders, revenue] =
      await Promise.all([
        prisma.order.count(),
        prisma.order.count({ where: { status: 'PENDING' } }),
        prisma.order.count({ where: { status: 'CONFIRMED' } }),
        prisma.order.count({ where: { status: 'DELIVERED' } }),
        prisma.order.aggregate({ _sum: { totalAmount: true } }),
      ]);

    res.json({
      success: true,
      data: {
        totalOrders,
        pendingOrders,
        confirmedOrders,
        deliveredOrders,
        totalRevenue: revenue._sum.totalAmount || 0,
      },
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { login, seedAdmin, getDashboardStats };
