// // const mongoose = require('mongoose');

// // const orderSchema = new mongoose.Schema({
// //   user: {
// //     type: mongoose.Schema.Types.ObjectId,
// //     ref: 'User',
// //     required: true
// //   },
// //   clerkUserId: {
// //     type: String // store Clerk user id for easy lookup
// //   },
// //   items: [
// //     {
// //       productId: String,
// //       name: String,
// //       price: Number,
// //       qty: Number,
// //       image: String,
// //       fitType: String,
// //       measurements: Object
// //     }
// //   ],
// //   shippingAddress: {
// //     fullName: String,
// //     phone: String,
// //     address: String,
// //     city: String,
// //     state: String,
// //     pincode: String
// //   },
// //   paymentMethod: {
// //     type: String,
// //     enum: ['COD', 'Online'],
// //     default: 'COD'
// //   },
// //   paymentStatus: {
// //     type: String,
// //     enum: ['Pending', 'Paid'],
// //     default: 'Pending'
// //   },
// //   orderStatus: {
// //     type: String,
// //     enum: ['Placed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
// //     default: 'Placed'
// //   },
// //   totalAmount: {
// //     type: Number,
// //     required: true
// //   }
// // }, { timestamps: true });

// // module.exports = mongoose.model('Order', orderSchema);

// const mongoose = require('mongoose');

// const orderSchema = new mongoose.Schema({
//   clerkUserId: { type: String, required: true },
//   userEmail: { type: String },
//   items: [
//     {
//       productId: String,
//       name: String,
//       priceValue: Number,
//       qty: Number,
//       image: String,
//       fitType: String,
//       measurements: Object
//     }
//   ],
//   shippingAddress: {
//     firstName: String,
//     lastName: String,
//     phone: String,
//     address: String,
//     city: String,
//     state: String,
//     pincode: String
//   },
//   paymentMethod: { type: String, default: 'cod' },
//   paymentStatus: { type: String, enum: ['Pending', 'Paid'], default: 'Pending' },
//   orderStatus: {
//     type: String,
//     enum: ['Placed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
//     default: 'Placed'
//   },
//   totalAmount: { type: Number, required: true }
// }, { timestamps: true });

// module.exports = mongoose.model('Order', orderSchema);



// const mongoose = require('mongoose');

// const orderSchema = new mongoose.Schema({
//   clerkUserId: { type: String, required: true },
//   userEmail: { type: String },
//   items: [
//     {
//       productId: String,
//       name: String,
//       priceValue: Number,
//       qty: Number,
//       image: String,
//       fitType: String,
//       measurements: Object
//     }
//   ],
//   shippingAddress: {
//     firstName: String,
//     lastName: String,
//     phone: String,
//     address: String,
//     city: String,
//     state: String,
//     pincode: String
//   },
//   paymentMethod: { type: String, default: 'cod' },
//   paymentStatus: { type: String, enum: ['Pending', 'Paid'], default: 'Pending' },
//   orderStatus: {
//     type: String,
//     enum: ['Placed', 'Processing', 'Shipped', 'Out for Delivery', 'Delivered', 'Cancelled'],
//     default: 'Placed'
//   },
//   totalAmount: { type: Number, required: true },
//   trackingInfo: {
//     estimatedDelivery: { type: Date },
//     shippedAt: { type: Date },
//     deliveredAt: { type: Date },
//     trackingNote: { type: String, default: '' }
//   }
// }, { timestamps: true });

// module.exports = mongoose.model('Order', orderSchema);

const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  clerkUserId: { type: String, required: true },
  userEmail: { type: String },
  items: [
    {
      productId: String,
      name: String,
      priceValue: Number,
      qty: Number,
      image: String,
      fitType: String,
      measurements: Object
    }
  ],
  shippingAddress: {
    firstName: String,
    lastName: String,
    phone: String,
    address: String,
    city: String,
    state: String,
    pincode: String
  },
  paymentMethod: { type: String, default: 'cod' },
  paymentStatus: { type: String, enum: ['Pending', 'Paid'], default: 'Pending' },
  orderStatus: {
    type: String,
    enum: ['Placed', 'Processing', 'Shipped', 'Out for Delivery', 'Delivered', 'Cancelled'],
    default: 'Placed'
  },
  totalAmount: { type: Number, required: true },
  trackingInfo: {
    estimatedDelivery: { type: Date },
    shippedAt: { type: Date },
    deliveredAt: { type: Date },
    trackingNote: { type: String, default: '' }
  },
  returnStatus: { 
    type: String, 
    enum: ['Requested', 'Under Review', 'Approved', 'Rejected'],
    default: null
  },
  returnReason: { type: String, default: '' },
  returnRequestedAt: { type: Date },
  adminNote: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);