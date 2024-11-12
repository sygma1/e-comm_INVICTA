import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

export const getProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8082/api/products');
      return response;
    } catch (error) {
      throw new Error('Error fetching products: ' + error.message);
    }
};

export const getProductById = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8082/api/products/${id}`);
      return response;
    } catch (error) {
      throw new Error('Error fetching product details');
    }
};

export const registerUser = (userData) => {
    return axios.post(`${API_BASE_URL}/api/users/register`, userData);
};



export const addToCart = (item) => {
  return axios.post(`${API_BASE_URL}/api/cart`, item); // This ensures consistency in URLs
};

export const getCartItems = async (userId) => {
  try {
    const response = await axios.get('http://localhost:8080/api/cart', {
      params: { userId }, // Pass userId as a query parameter
    });
    return response.data; // Return the cart items data
  } catch (error) {
    console.error('Error fetching cart items:', error);
    throw new Error('Error fetching cart items');
  }
};

export const removeFromCart = async (userId, productId) => {
  try {
    const response = await axios.delete('http://localhost:8080/api/cart', {
      params: { userId, productId }, // Pass userId and productId as query params
    });
    return response;
  } catch (error) {
    console.error('Error removing item from cart', error);
    throw error; // Rethrow to propagate the error
  }
};

export const loginUser = (userData) => {
    return axios.post(`${API_BASE_URL}/api/users/login`, userData);
};


export const checkout = (cartData) => {
    return axios.post(`${API_BASE_URL}/api/checkout`, cartData);
};

// Add more API calls as needed for orders and payments
