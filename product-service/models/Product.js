const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  stock: { type: Number, required: true },
  image: { type: String, required: true },  // New field for image URL
});

module.exports = mongoose.model('Product', productSchema);
