const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 5000; // Update to match the API gateway port

app.use(express.json());

// Example route to get products from the product service
app.get('/api/products', async (req, res) => {
  try {
    const response = await axios.get('http://product-service:5002/api/products'); // Service name and port
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products' });
  }
});

// Example route to handle user registration
app.post('/api/users/register', async (req, res) => {
  try {
    const response = await axios.post('http://user-service:5001/api/users/register', req.body); // Service name and port
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error registering user' });
  }
});

// Example route to handle user login
app.post('/api/users/login', async (req, res) => {
  try {
    const response = await axios.post('http://user-service:5001/api/users/login', req.body); // Service name and port
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error logging in user' });
  }
});

// Example route to get cart items for a user
app.get('/api/cart/:userId', async (req, res) => {
  try {
    const response = await axios.get(`http://cart-service:5003/api/cart/${req.params.userId}`); // Ensure cart service exists
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cart items' });
  }
});

// Example route to add an item to the cart
app.post('/api/cart', async (req, res) => {
  try {
    const response = await axios.post('http://cart-service:5003/api/cart', req.body); // Ensure cart service exists
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error adding item to cart' });
  }
});

// Example route to remove an item from the cart
app.delete('/api/cart', async (req, res) => {
  try {
    const response = await axios.delete('http://cart-service:5003/api/cart', { data: req.body }); // Ensure cart service exists
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error removing item from cart' });
  }
});

// Example route to place an order
app.post('/api/orders', async (req, res) => {
  try {
    const response = await axios.post('http://order-service:5004/api/orders', req.body); // Ensure order service exists
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error placing order' });
  }
});

// Example route to handle payment
app.post('/api/payments', async (req, res) => {
  try {
    const response = await axios.post('http://payment-service:5005/api/payments', req.body); // Ensure payment service exists
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error processing payment' });
  }
});

// Add similar routes for other services as needed...

app.listen(PORT, () => {
  console.log(`API Gateway listening on port ${PORT}`);
});
