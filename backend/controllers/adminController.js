const Order = require('../models/Order');
const Product = require('../models/Product');

// GET /api/admin/orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// PUT /api/admin/orders/:id/status
const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    order.orderStatus = req.body.orderStatus;
    if (!order.trackingInfo) order.trackingInfo = {};

    if (req.body.orderStatus === 'Shipped') {
      order.trackingInfo.shippedAt = new Date();
      order.trackingInfo.estimatedDelivery = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000);
    }
    if (req.body.orderStatus === 'Delivered') {
      order.trackingInfo.deliveredAt = new Date();
    }
    if (req.body.trackingNote) {
      order.trackingInfo.trackingNote = req.body.trackingNote;
    }

    await order.save();
    res.status(200).json({ message: 'Order status updated', order });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// GET /api/admin/products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// POST /api/admin/products - now includes stock
const addProduct = async (req, res) => {
  try {
    const { name, price, priceValue, rating, desc, image, category, stock } = req.body;
    const inStock = stock > 0;
    const product = await Product.create({ name, price, priceValue, rating, desc, image, category, stock: stock || 10, inStock });
    res.status(201).json({ message: 'Product added', product });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// DELETE /api/admin/products/:id
const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// PUT /api/admin/products/:id/stock - update stock
const updateStock = async (req, res) => {
  try {
    const { stock } = req.body;
    const inStock = stock > 0;
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { stock, inStock },
      { new: true }
    );
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json({ message: 'Stock updated', product });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// GET /api/admin/stats
const getStats = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const totalProducts = await Product.countDocuments();
    const orders = await Order.find();
    const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);
    const pendingOrders = await Order.countDocuments({ orderStatus: 'Placed' });
    const outOfStock = await Product.countDocuments({ inStock: false });
    res.status(200).json({ totalOrders, totalProducts, totalRevenue, pendingOrders, outOfStock });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { getAllOrders, updateOrderStatus, getAllProducts, addProduct, deleteProduct, updateStock, getStats };