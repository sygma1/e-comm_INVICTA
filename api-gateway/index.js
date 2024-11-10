const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 8080; // Update to match the API gateway port

const cors = require('cors');
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

app.get('/hello', (req, res) => {
  res.send('Hello, world!');
});

// Example route to get products from the product service
app.get('/api/products', async (req, res) => {
  try {
    const response = await axios.get('http://product-service:8082/api/products'); // Service name and port
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products' });
  }
});

// Example route to handle user registration
app.post('/api/users/register', async (req, res) => {
  try {
      console.log('Received data:', req.body);  // Log request data
      const response = await axios.post('http://localhost:8081/api/users/register', req.body);
      console.log('Response from user-service:', response.data);  // Log response from user service
      res.json(response.data);
  } catch (error) {
      console.error('Error in API Gateway:', error.message);  // Log error details
      res.status(500).json({ message: 'Error registering user' });
  }
});

// Example route to handle user login
app.post('/api/users/login', async (req, res) => {
  try {
    console.log('Login attempt data:', req.body);  // Log incoming request data
    const response = await axios.post('http://localhost:8081/api/users/login', req.body);
    console.log('Response from user-service:', response.data);  // Log successful response
    res.json(response.data);
  } catch (error) {
    console.error('Error during login in API Gateway:', error);  // Log error details
    res.status(500).json({ message: 'Error logging in user', error: error.message });
  }
});

// Example route to get cart items for a user
app.get('/api/cart/:userId', async (req, res) => {
  try {
    const response = await axios.get(`http://localhost:8083/api/cart/${req.params.userId}`); // Ensure cart service exists
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cart items' });
  }
});

// Example route to add an item to the cart
app.post('/api/cart', async (req, res) => {
  try {
    const response = await axios.post('http://localhost:8083/api/cart', req.body); // Ensure cart service exists
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error adding item to cart' });
  }
});

// Example route to remove an item from the cart
app.delete('/api/cart', async (req, res) => {
  try {
    const response = await axios.delete('http://localhost:8083/api/cart', { data: req.body }); // Ensure cart service exists
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error removing item from cart' });
  }
});

// Example route to place an order
app.post('/api/orders', async (req, res) => {
  try {
    const response = await axios.post('http://localhost:8084/api/orders', req.body); // Ensure order service exists
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error placing order' });
  }
});

// Example route to handle payment
app.post('/api/payments', async (req, res) => {
  try {
    const response = await axios.post('http://localhost:8085/api/payments', req.body); // Ensure payment service exists
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error processing payment' });
  }
});

// Add similar routes for other services as needed...

app.listen(PORT, () => {
  console.log(`API Gateway listening on port ${PORT}`);
});
