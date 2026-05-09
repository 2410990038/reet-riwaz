const express = require('express');
const router = express.Router();
const { getAllOrders, updateOrderStatus, getAllProducts, addProduct, deleteProduct, updateStock, getStats, updateProduct } = require('../controllers/adminController');

// ✅ FIXED: now checks the actual email value, not just if header exists
const adminOnly = (req, res, next) => {
  const adminEmail = req.headers['admin-email'];
  if (!adminEmail || adminEmail.trim().toLowerCase() !== 'angelpreetk2315@gmail.com') {
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

// ✅ NEW: Edit full product (name, price, image, desc, category, stock, rating)
router.put('/products/:id', adminOnly, updateProduct);

module.exports = router;