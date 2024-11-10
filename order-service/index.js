const express = require('express');
const mongoose = require('mongoose');
const Order = require('./models/Order');
const app = express();
const PORT = process.env.PORT || 6004;

app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://mongodb:27017/ecomm', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Define routes for orders
app.post('/api/orders', async (req, res) => {
  const newOrder = new Order(req.body);

  try {
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Order service listening on port ${PORT}`);
});
