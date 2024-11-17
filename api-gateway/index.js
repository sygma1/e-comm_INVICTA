const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 8080; // Update to match the API gateway port

const USER_SERVICE_URL = 'user-service:8081'; 
const PRODUCT_SERVICE_URL = 'product-service:8082'; 
const CART_SERVICE_URL = 'cart-service:8083'; 
const ORDER_SERVICE_URL = 'order-service:8084'; 
const PAYMENT_SERVICE_URL= "payment-service:8085";
const FRONTEND_URL='frontend:80';

const cors = require('cors');
app.use(cors({ origin: FRONTEND_URL })); // Allow frontend on localhost:3000 to communicate with API Gateway
app.use(express.json());

app.get('/hello', (req, res) => {
  res.send('Hello, world!');
});

// Route to get products from the product service
app.get('/api/products', async (req, res) => {
  try {
    const response = await axios.get(`${PRODUCT_SERVICE_URL}/api/products`);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching products from product-service:', error);  // Log the error in the backend
    res.status(500).send('Error fetching products');
  }
});

// Route to get a product by ID from the product service
app.get('/api/products/:id', async (req, res) => {
  try {
    const response = await axios.get(`${PRODUCT_SERVICE_URL}/api/products/${req.params.id}`);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching product details:', error);
    res.status(500).send('Error fetching product details');
  }
});

// Route to handle user registration via user service
app.post('/api/users/register', async (req, res) => {
  try {
    const response = await axios.post(`${USER_SERVICE_URL}/api/users/register`, req.body);
    res.json(response.data);
  } catch (error) {
    console.error('Error in API Gateway during registration:', error.message);
    res.status(500).json({ message: 'Error registering user' });
  }
});

// Route to handle user login via user service
app.post('/api/users/login', async (req, res) => {
  try {
    const response = await axios.post(`${USER_SERVICE_URL}/api/users/login`, req.body);
    res.json(response.data);
  } catch (error) {
    console.error('Error during login in API Gateway:', error);
    res.status(500).json({ message: 'Error logging in user', error: error.message });
  }
});

// Route to get cart items for a user from the cart service
app.get('/api/cart/:userId', async (req, res) => {
  try {
    const response = await axios.get(`${CART_SERVICE_URL}/api/cart/${req.params.userId}`);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching cart items:', error);
    res.status(500).json({ message: 'Error fetching cart items' });
  }
});

// Route to add a product to the cart via the cart service
app.post('/api/cart', async (req, res) => {
  try {
    if (!req.body.userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }
    const response = await axios.post(`${CART_SERVICE_URL}/api/cart`, req.body);
    res.json(response.data);
  } catch (error) {
    console.error('Error adding product to cart:', error.response ? error.response.data : error.message);
    res.status(500).json({ message: 'Error adding product to cart' });
  }
});

// Route to remove an item from the cart
app.delete('/api/cart/:userId/remove', async (req, res) => {
  const { userId } = req.params;
  const { productId } = req.body;

  try {
    const response = await axios.delete(`${CART_SERVICE_URL}/api/cart/${userId}/remove`, {
      data: { productId }
    });
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error('Error removing item from cart:', error.message);
    res.status(500).json({ message: 'Failed to remove item from cart' });
  }
});

// Route to place an order via the checkout service
app.post('/api/orders', async (req, res) => {
  try {
    const response = await axios.post(`${ORDER_SERVICE_URL}/api/orders`, req.body);
    res.json(response.data);
  } catch (error) {
    console.error('Error placing order:', error.message);
    res.status(500).json({ message: 'Error placing order' });
  }
});

// Route to handle payments via the payment service
app.post('/api/payments', async (req, res) => {
  try {
    const response = await axios.post(`${PAYMENT_SERVICE_URL}/api/payments`, req.body);
    res.json(response.data);
  } catch (error) {
    console.error('Error processing payment:', error.message);
    res.status(500).json({ message: 'Error processing payment' });
  }
});

// Add more routes for other services as needed

// Start the API Gateway
app.listen(PORT, () => {
  console.log(`API Gateway listening on port ${PORT}`);
});
