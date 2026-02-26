const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: String, required: true },
  priceValue: { type: Number, required: true },
  rating: { type: Number, default: 4.5 },
  desc: { type: String },
  image: { type: String },
  category: { type: String, enum: ['women', 'men', 'kids'], required: true }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);