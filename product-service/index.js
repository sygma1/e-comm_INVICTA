const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const productRoutes = require('./routes/productRoutes'); // Correct the path to your productRoutes.js file

const app = express();
const PORT = process.env.PORT || 8082;

// Enable CORS for all routes
app.use(cors({
  origin: 'http://localhost:3000',  // Allow only requests from this domain
}));

app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Use the routes defined in productRoutes.js
app.use('/api/products', productRoutes); // Now the routes defined in productRoutes will be used

// Start the server
app.listen(PORT, () => {
  console.log(`Product service listening on port ${PORT}`);
});
