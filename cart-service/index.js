const express = require('express');
const mongoose = require('mongoose');
const Cart = require('./models/Cart');
const Product = require('./models/Product');
const cors = require('cors');
const cartRoutes = require('./routes/cartRoutes');  // Import cartRoutes.js
const app = express();
const PORT = process.env.PORT || 8083;

const FRONTEND_URL='http://localhost:80';

app.use(express.json());

app.use(cors({
  origin: FRONTEND_URL,  // Allow only requests from this domain
}));

// Connect to MongoDB
mongoose.connect('mongodb://mongo-service:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Use the routes defined in cartRoutes.js
app.use('/api/cart', cartRoutes);  // Use cartRoutes for any path starting with /api/cart

// Start the server
app.listen(PORT, () => {
  console.log(`Cart service listening on port ${PORT}`);
});




