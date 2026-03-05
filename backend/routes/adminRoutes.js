const express = require('express');
const router = express.Router();
const { getAllOrders, updateOrderStatus, getAllProducts, addProduct, deleteProduct, updateStock, getStats } = require('../controllers/adminController');

const adminOnly = (req, res, next) => {
  const adminEmail = req.headers['admin-email'];
  if (!adminEmail) {
    return res.status(403).json({ message: 'Access denied' });
  }
  next();
};

router.get('/stats', adminOnly, getStats);
router.get('/orders', adminOnly, getAllOrders);
router.put('/orders/:id/status', adminOnly, updateOrderStatus);
router.get('/products', adminOnly, getAllProducts);
router.post('/products', adminOnly, addProduct);
router.delete('/products/:id', adminOnly, deleteProduct);
router.put('/products/:id/stock', adminOnly, updateStock);

module.exports = router;