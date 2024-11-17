import axios from 'axios';

const API_GATEWAY_URL = 'api-gateway:8080'; // API Gateway base URL

// Create a centralized axios instance to use the API Gateway
const api = axios.create({
  baseURL: API_GATEWAY_URL, // Base URL points to the API Gateway
});

export const getProducts = async () => {
  try {
    const response = await api.get('/api/products'); // Now routed through API Gateway
    return response;
  } catch (error) {
    throw new Error('Error fetching products: ' + error.message);
  }
};

export const getProductById = async (id) => {
  try {
    const response = await api.get(`/api/products/${id}`); // API Gateway
    return response;
  } catch (error) {
    throw new Error('Error fetching product details');
  }
};

export const registerUser = (userData) => {
  return api.post('/api/users/register', userData); // API Gateway
};

export const addToCart = async (cartData) => {
  try {
    const response = await api.post('/api/cart', cartData); // API Gateway
    return response;
  } catch (error) {
    throw new Error('Failed to add product to cart');
  }
};

export const getCartItems = async (userId) => {
  try {
    console.log('Fetching cart items from:', `${API_GATEWAY_URL}/api/cart/${userId}`);
    const response = await api.get(`/api/cart/${userId}`); // API Gateway
    return response.data;
  } catch (error) {
    console.error('Error fetching cart items:', error.response?.data || error.message);
    throw new Error('Error fetching cart items');
  }
};

export const removeFromCart = async (userId, productId) => {
  try {
    const response = await api.delete(`/api/cart/${userId}/remove`, {
      data: { productId }, // API Gateway
    });
    return response.data;
  } catch (error) {
    console.error('Error removing item from cart:', error.response?.data || error.message);
    throw new Error('Error removing item from cart');
  }
};

export const loginUser = (userData) => {
  return api.post('/api/users/login', userData); // API Gateway
};

export const checkout = (cartData) => {
  return api.post('/api/checkout', cartData); // API Gateway
};
