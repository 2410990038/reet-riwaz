// const express = require('express');
// const router = express.Router();
// const { placeOrder, getMyOrders, getOrderById, cancelOrder } = require('../controllers/orderController');
// const { protect } = require('../middleware/authMiddleware');

// router.post('/place', protect, placeOrder);
// router.get('/my', protect, getMyOrders);
// router.get('/:id', protect, getOrderById);
// router.put('/:id/cancel', protect, cancelOrder);

// module.exports = router;

// const express = require('express');
// const router = express.Router();
// const { placeOrder, getMyOrders, getOrderById, cancelOrder } = require('../controllers/orderController');

// router.post('/place', placeOrder);
// router.get('/my/:clerkUserId', getMyOrders);
// router.get('/:id', getOrderById);
// router.put('/:id/cancel', cancelOrder);
// router.get('/user/id/:userId', getUserOrdersByUserId);

// module.exports = router;


const express = require('express');
const router = express.Router();
const { placeOrder, getMyOrders, getUserOrders, getUserOrdersByUserId, getOrderById, cancelOrder } = require('../controllers/orderController');

router.post('/place', placeOrder);
router.get('/my/:clerkUserId', getMyOrders);
router.get('/user/id/:userId', getUserOrdersByUserId);
router.get('/user/:email', getUserOrders);
router.get('/:id', getOrderById);
router.put('/:id/cancel', cancelOrder);

module.exports = router;