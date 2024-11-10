import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080'; // API Gateway URL

export const getProducts = () => {
    return axios.get(`${API_BASE_URL}/api/products`);
};

export const getProductById = (id) => {
    return axios.get(`${API_BASE_URL}/api/products/${id}`);
};

export const registerUser = (userData) => {
    return axios.post(`${API_BASE_URL}/api/users/register`, userData);
};

export const removeFromCart = (itemId) => {
    return axios.delete(`${API_BASE_URL}/api/cart`, { data: { id: itemId } });
};

export const loginUser = (userData) => {
    return axios.post(`${API_BASE_URL}/api/users/login`, userData);
};

export const getCartItems = (userId) => {
    return axios.get(`${API_BASE_URL}/api/cart/${userId}`);
};

export const addToCart = (item) => {
    return axios.post(`${API_BASE_URL}/api/cart`, item);
};

export const checkout = (cartData) => {
    return axios.post(`${API_BASE_URL}/api/checkout`, cartData);
};

// Add more API calls as needed for orders and payments
