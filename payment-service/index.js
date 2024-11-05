const express = require('express');
const mongoose = require('mongoose');
const Payment = require('./models/Payment');
const app = express();
const PORT = process.env.PORT || 5005;

app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://mongodb:27017/ecomm', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Define routes for payments
app.post('/api/payments', async (req, res) => {
  const newPayment = new Payment(req.body);

  try {
    const savedPayment = await newPayment.save();
    res.status(201).json(savedPayment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Payment service listening on port ${PORT}`);
});
