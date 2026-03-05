const mongoose = require('mongoose');

const returnRequestSchema = new mongoose.Schema({
  orderId: { type: String, required: true },
  clerkUserId: { type: String, required: true },
  userEmail: { type: String },
  items: [{ name: String, qty: Number, priceValue: Number }],
  reason: { type: String, required: true },
  status: {
    type: String,
    enum: ['Requested', 'Under Review', 'Approved', 'Rejected'],
    default: 'Requested'
  },
  totalAmount: { type: Number },
  adminNote: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('ReturnRequest', returnRequestSchema);