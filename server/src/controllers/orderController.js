const { prisma } = require('../utils/prisma');



/**
 * GET /api/orders  — Admin: all orders
 */
async function getOrders(req, res, next) {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const where = {};
    if (status) where.status = status;

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (parseInt(page) - 1) * parseInt(limit),
        take: parseInt(limit),
      }),
      prisma.order.count({ where }),
    ]);

    res.json({ success: true, data: orders, total, page: parseInt(page) });
  } catch (err) {
    next(err);
  }
}

/**
 * GET /api/orders/:id  — Admin: single order by DB id
 */
async function getOrderById(req, res, next) {
  try {
    const order = await prisma.order.findUnique({ where: { id: req.params.id } });
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    res.json({ success: true, data: order });
  } catch (err) {
    next(err);
  }
}

/**
 * PATCH /api/orders/:id/status  — Admin: update order status
 * Body: { status: "CONFIRMED" | "DELIVERED" }
 */
async function updateOrderStatus(req, res, next) {
  try {
    const { status } = req.body;
    const valid = ['PENDING', 'CONFIRMED', 'DELIVERED'];

    if (!valid.includes(status)) {
      return res.status(400).json({ success: false, message: `Status must be one of: ${valid.join(', ')}` });
    }

    const order = await prisma.order.findUnique({ where: { id: req.params.id } });
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    const updated = await prisma.order.update({
      where: { id: req.params.id },
      data: { status },
    });

    res.json({ success: true, data: updated });
  } catch (err) {
    next(err);
  }
}

module.exports = { getOrders, getOrderById, updateOrderStatus };
