const Order = require('../models/Order');
const Product = require('../models/Product');

// GET /api/admin/orders - get all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// PUT /api/admin/orders/:id/status - update order status
const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    order.orderStatus = req.body.orderStatus;
    await order.save();
    res.status(200).json({ message: 'Order status updated', order });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// GET /api/admin/products - get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// POST /api/admin/products - add new product
const addProduct = async (req, res) => {
  try {
    const { name, price, priceValue, rating, desc, image, category } = req.body;
    const product = await Product.create({ name, price, priceValue, rating, desc, image, category });
    res.status(201).json({ message: 'Product added', product });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// DELETE /api/admin/products/:id - delete product
const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Product deleted' });
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
    res.status(200).json({ totalOrders, totalProducts, totalRevenue, pendingOrders });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { getAllOrders, updateOrderStatus, getAllProducts, addProduct, deleteProduct, getStats };