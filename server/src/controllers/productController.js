const { prisma } = require('../utils/prisma');

const { uploadImage, deleteImage } = require('../services/cloudinaryService');


/**
 * GET /api/products
 * Public — returns all products (optionally filtered)
 */
async function getProducts(req, res, next) {
  try {
    const { category, featured, search } = req.query;

    const where = {};
    if (category) where.category = category;
    if (featured === 'true') where.isFeatured = true;
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    const products = await prisma.product.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: { promotionalSales: { where: { isActive: true } } },
    });

    res.json({ success: true, data: products });
  } catch (err) {
    next(err);
  }
}

/**
 * GET /api/products/:id
 * Public
 */
async function getProductById(req, res, next) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: req.params.id },
      include: { promotionalSales: { where: { isActive: true } } },
    });

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.json({ success: true, data: product });
  } catch (err) {
    next(err);
  }
}

/**
 * POST /api/products
 * Admin — create product with image uploads
 */
async function createProduct(req, res, next) {
  try {
    const { name, description, price, category, stock, isFeatured, discount } = req.body;

    if (!name || !description || !price || !category) {
      return res.status(400).json({ success: false, message: 'name, description, price, and category are required' });
    }

    // Upload all images in parallel
    const files = req.files || [];
    const uploadResults = await Promise.all(
      files.map((f) => uploadImage(f.buffer))
    );
    const images = uploadResults.map((r) => r.url);

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        images,
        category,
        stock: parseInt(stock) || 0,
        isFeatured: isFeatured === 'true' || isFeatured === true,
        discount: parseInt(discount) || 0,
      },
    });

    res.status(201).json({ success: true, data: product });
  } catch (err) {
    next(err);
  }
}

/**
 * PUT /api/products/:id
 * Admin — update product (optionally upload new images)
 */
async function updateProduct(req, res, next) {
  try {
    const { name, description, price, category, stock, isFeatured, discount } = req.body;

    const existing = await prisma.product.findUnique({ where: { id: req.params.id } });
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    let images = existing.images;
    const files = req.files || [];

    if (files.length > 0) {
      const uploadResults = await Promise.all(
        files.map((f) => uploadImage(f.buffer))
      );
      images = uploadResults.map((r) => r.url);
    }

    const product = await prisma.product.update({
      where: { id: req.params.id },
      data: {
        ...(name && { name }),
        ...(description && { description }),
        ...(price && { price: parseFloat(price) }),
        ...(category && { category }),
        ...(stock !== undefined && { stock: parseInt(stock) }),
        ...(isFeatured !== undefined && { isFeatured: isFeatured === 'true' || isFeatured === true }),
        ...(discount !== undefined && { discount: parseInt(discount) }),
        images,
      },
    });

    res.json({ success: true, data: product });
  } catch (err) {
    next(err);
  }
}

/**
 * DELETE /api/products/:id
 * Admin
 */
async function deleteProduct(req, res, next) {
  try {
    const existing = await prisma.product.findUnique({ where: { id: req.params.id } });
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    await prisma.product.delete({ where: { id: req.params.id } });

    res.json({ success: true, message: 'Product deleted' });
  } catch (err) {
    next(err);
  }
}

module.exports = { getProducts, getProductById, createProduct, updateProduct, deleteProduct };
