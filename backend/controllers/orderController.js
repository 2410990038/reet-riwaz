// // const Order = require('../models/Order');

// // // @route  POST /api/orders/place
// // // @desc   Place a new order
// // // @access Protected
// // const placeOrder = async (req, res) => {
// //   const { items, shippingAddress, paymentMethod, totalAmount } = req.body;

// //   try {
// //     if (!items || items.length === 0) {
// //       return res.status(400).json({ message: 'No items in order' });
// //     }

// //     const order = await Order.create({
// //       user: req.user.id,
// //       items,
// //       shippingAddress,
// //       paymentMethod: paymentMethod || 'COD',
// //       totalAmount
// //     });

// //     res.status(201).json({ message: 'Order placed successfully', order });
// //   } catch (error) {
// //     res.status(500).json({ message: 'Server error', error: error.message });
// //   }
// // };

// // // @route  GET /api/orders/my
// // // @desc   Get all orders of logged in user
// // // @access Protected
// // const getMyOrders = async (req, res) => {
// //   try {
// //     const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
// //     res.status(200).json(orders);
// //   } catch (error) {
// //     res.status(500).json({ message: 'Server error', error: error.message });
// //   }
// // };

// // // @route  GET /api/orders/:id
// // // @desc   Get single order by ID
// // // @access Protected
// // const getOrderById = async (req, res) => {
// //   try {
// //     const order = await Order.findById(req.params.id);

// //     if (!order) return res.status(404).json({ message: 'Order not found' });

// //     // Make sure the order belongs to the logged in user
// //     if (order.user.toString() !== req.user.id) {
// //       return res.status(403).json({ message: 'Not authorized' });
// //     }

// //     res.status(200).json(order);
// //   } catch (error) {
// //     res.status(500).json({ message: 'Server error', error: error.message });
// //   }
// // };

// // // @route  PUT /api/orders/:id/cancel
// // // @desc   Cancel an order
// // // @access Protected
// // const cancelOrder = async (req, res) => {
// //   try {
// //     const order = await Order.findById(req.params.id);

// //     if (!order) return res.status(404).json({ message: 'Order not found' });

// //     if (order.user.toString() !== req.user.id) {
// //       return res.status(403).json({ message: 'Not authorized' });
// //     }

// //     if (order.orderStatus !== 'Placed') {
// //       return res.status(400).json({ message: 'Order cannot be cancelled at this stage' });
// //     }

// //     order.orderStatus = 'Cancelled';
// //     await order.save();

// //     res.status(200).json({ message: 'Order cancelled successfully', order });
// //   } catch (error) {
// //     res.status(500).json({ message: 'Server error', error: error.message });
// //   }
// // };

// // module.exports = { placeOrder, getMyOrders, getOrderById, cancelOrder };

// const Order = require('../models/Order');

// // @route  POST /api/orders/place
// const placeOrder = async (req, res) => {
//   const { clerkUserId, userEmail, items, shippingAddress, paymentMethod, totalAmount } = req.body;

//   try {
//     if (!clerkUserId) return res.status(400).json({ message: 'User not identified' });
//     if (!items || items.length === 0) return res.status(400).json({ message: 'No items in order' });

//     const order = await Order.create({
//       clerkUserId,
//       userEmail,
//       items,
//       shippingAddress,
//       paymentMethod: paymentMethod || 'cod',
//       totalAmount
//     });

//     res.status(201).json({ message: 'Order placed successfully', order });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };

// // @route  GET /api/orders/my/:clerkUserId
// const getMyOrders = async (req, res) => {
//   try {
//     const orders = await Order.find({ clerkUserId: req.params.clerkUserId }).sort({ createdAt: -1 });
//     res.status(200).json(orders);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };

// // @route  GET /api/orders/:id
// const getOrderById = async (req, res) => {
//   try {
//     const order = await Order.findById(req.params.id);
//     if (!order) return res.status(404).json({ message: 'Order not found' });
//     res.status(200).json(order);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };

// // @route  PUT /api/orders/:id/cancel
// const cancelOrder = async (req, res) => {
//   try {
//     const order = await Order.findById(req.params.id);
//     if (!order) return res.status(404).json({ message: 'Order not found' });
//     if (order.orderStatus !== 'Placed') {
//       return res.status(400).json({ message: 'Order cannot be cancelled at this stage' });
//     }
//     order.orderStatus = 'Cancelled';
//     await order.save();
//     res.status(200).json({ message: 'Order cancelled', order });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };

// module.exports = { placeOrder, getMyOrders, getOrderById, cancelOrder };




// const Order = require('../models/Order');

// // @route  POST /api/orders/place
// const placeOrder = async (req, res) => {
//   const { clerkUserId, userEmail, items, shippingAddress, paymentMethod, totalAmount } = req.body;

//   try {
//     if (!items || items.length === 0) return res.status(400).json({ message: 'No items in order' });

//     const order = await Order.create({
//       clerkUserId: clerkUserId || 'guest',
//       userEmail,
//       items,
//       shippingAddress,
//       paymentMethod: paymentMethod || 'cod',
//       totalAmount
//     });

//     res.status(201).json({ message: 'Order placed successfully', order });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };

// // @route  GET /api/orders/my/:clerkUserId
// const getMyOrders = async (req, res) => {
//   try {
//     const orders = await Order.find({ clerkUserId: req.params.clerkUserId }).sort({ createdAt: -1 });
//     res.status(200).json(orders);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };

// // @route  GET /api/orders/user/:email
// const getUserOrders = async (req, res) => {
//   try {
//     const orders = await Order.find({ userEmail: req.params.email }).sort({ createdAt: -1 });
//     res.status(200).json(orders);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };

// // @route  GET /api/orders/user/id/:userId
// const getUserOrdersByUserId = async (req, res) => {
//   try {
//     const orders = await Order.find({ clerkUserId: req.params.userId }).sort({ createdAt: -1 });
//     res.status(200).json(orders);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };

// // @route  GET /api/orders/:id
// const getOrderById = async (req, res) => {
//   try {
//     const order = await Order.findById(req.params.id);
//     if (!order) return res.status(404).json({ message: 'Order not found' });
//     res.status(200).json(order);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };

// // @route  PUT /api/orders/:id/cancel
// const cancelOrder = async (req, res) => {
//   try {
//     const order = await Order.findById(req.params.id);
//     if (!order) return res.status(404).json({ message: 'Order not found' });
//     if (order.orderStatus !== 'Placed') {
//       return res.status(400).json({ message: 'Order cannot be cancelled at this stage' });
//     }
//     order.orderStatus = 'Cancelled';
//     await order.save();
//     res.status(200).json({ message: 'Order cancelled', order });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };

// module.exports = { placeOrder, getMyOrders, getUserOrders, getUserOrdersByUserId, getOrderById, cancelOrder };



const Order = require('../models/Order');

// @route  POST /api/orders/place
const placeOrder = async (req, res) => {
  const { clerkUserId, userEmail, items, shippingAddress, paymentMethod, totalAmount } = req.body;

  try {
    if (!items || items.length === 0) return res.status(400).json({ message: 'No items in order' });

    // ✅ Duplicate check — block same order within 15 seconds
    const fifteenSecondsAgo = new Date(Date.now() - 30000);
    const existingOrder = await Order.findOne({
      clerkUserId: clerkUserId || 'guest',
      totalAmount,
      createdAt: { $gte: fifteenSecondsAgo }
    });

    if (existingOrder) {
      return res.status(200).json({ message: 'Order already placed', order: existingOrder });
    }

    const order = await Order.create({
      clerkUserId: clerkUserId || 'guest',
      userEmail,
      items,
      shippingAddress,
      paymentMethod: paymentMethod || 'cod',
      totalAmount
    });

    res.status(201).json({ message: 'Order placed successfully', order });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @route  GET /api/orders/my/:clerkUserId
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ clerkUserId: req.params.clerkUserId }).sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @route  GET /api/orders/user/:email
const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userEmail: req.params.email }).sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @route  GET /api/orders/user/id/:userId
const getUserOrdersByUserId = async (req, res) => {
  try {
    const orders = await Order.find({ clerkUserId: req.params.userId }).sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @route  GET /api/orders/:id
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @route  PUT /api/orders/:id/cancel
const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    if (order.orderStatus !== 'Placed') {
      return res.status(400).json({ message: 'Order cannot be cancelled at this stage' });
    }
    order.orderStatus = 'Cancelled';
    await order.save();
    res.status(200).json({ message: 'Order cancelled', order });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @route  POST /api/orders/:id/return
const requestReturn = async (req, res) => {
  try {
    const { reason } = req.body;
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    if (order.orderStatus !== 'Delivered') {
      return res.status(400).json({ message: 'Only delivered orders can be returned' });
    }
    order.returnStatus = 'Requested';
    order.returnReason = reason || 'No reason provided';
    order.returnRequestedAt = new Date();
    await order.save();
    res.status(200).json({ message: 'Return requested', order });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @route  PUT /api/orders/:id/return-status
const updateReturnStatus = async (req, res) => {
  try {
    const { returnStatus, adminNote } = req.body;
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    order.returnStatus = returnStatus;
    if (adminNote) order.adminNote = adminNote;
    await order.save();
    res.status(200).json({ message: 'Return status updated', order });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @route  GET /api/orders/returns/all (admin)
const getAllReturns = async (req, res) => {
  try {
    const returns = await Order.find({ returnStatus: { $exists: true, $ne: null } }).sort({ createdAt: -1 });
    res.status(200).json(returns);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { 
  placeOrder, 
  getMyOrders, 
  getUserOrders, 
  getUserOrdersByUserId, 
  getOrderById, 
  cancelOrder,
  requestReturn,
  updateReturnStatus,
  getAllReturns
};