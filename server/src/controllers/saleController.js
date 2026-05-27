const { prisma } = require('../utils/prisma');



async function getSales(req, res, next) {
  try {
    const sales = await prisma.sale.findMany({
      orderBy: { createdAt: 'desc' },
      include: { product: { select: { id: true, name: true, price: true } } },
    });
    res.json({ success: true, data: sales });
  } catch (err) { next(err); }
}

async function createSale(req, res, next) {
  try {
    const { productId, discountPercent, startDate, endDate } = req.body;
    if (!productId || !discountPercent || !startDate || !endDate) {
      return res.status(400).json({ success: false, message: 'productId, discountPercent, startDate, endDate are required' });
    }
    const sale = await prisma.sale.create({
      data: {
        productId,
        discountPercent: parseInt(discountPercent),
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        isActive: true,
      },
      include: { product: { select: { id: true, name: true } } },
    });
    res.status(201).json({ success: true, data: sale });
  } catch (err) { next(err); }
}

async function toggleSale(req, res, next) {
  try {
    const sale = await prisma.sale.findUnique({ where: { id: req.params.id } });
    if (!sale) return res.status(404).json({ success: false, message: 'Sale not found' });
    const updated = await prisma.sale.update({
      where: { id: req.params.id },
      data: { isActive: !sale.isActive },
    });
    res.json({ success: true, data: updated });
  } catch (err) { next(err); }
}

async function deleteSale(req, res, next) {
  try {
    const sale = await prisma.sale.findUnique({ where: { id: req.params.id } });
    if (!sale) return res.status(404).json({ success: false, message: 'Sale not found' });
    await prisma.sale.delete({ where: { id: req.params.id } });
    res.json({ success: true, message: 'Sale deleted' });
  } catch (err) { next(err); }
}

module.exports = { getSales, createSale, toggleSale, deleteSale };
