import React, { useEffect, useState } from 'react';
import { getCartItems, removeFromCart } from '../services/api';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const userId = localStorage.getItem('userId'); // Get userId from localStorage
        if (!userId) {
            setError('User not authenticated');
            setLoading(false);
            return;
        }

        const fetchCartItems = async () => {
            try {
                const response = await getCartItems(userId); // Get the cart items for the user
                console.log('Fetched Cart Items:', response);  // Check the response here

                // Check if the response is an array and has at least one item (cart)
                if (Array.isArray(response) && response.length > 0) {
                    const items = response[0].items || [];  // Access items from the first cart
                    setCartItems(items);  // Set cart items
                } else {
                    setCartItems([]);  // If no items found or incorrect structure
                    setError('No items found in the cart');
                }
            } catch (err) {
                console.error(err);
                setError('Error fetching cart items');
            } finally {
                setLoading(false);
            }
        };

        fetchCartItems();
    }, []); // Only run once on component mount

    const handleRemoveFromCart = async (productId) => {
        const userId = localStorage.getItem('userId'); // Get userId from localStorage
        if (!userId) {
            setError('User not authenticated');
            return;
        }

        try {
            await removeFromCart(userId, productId); // Remove item from the cart
            setCartItems(cartItems.filter(item => item.productId !== productId)); // Remove item from the UI
        } catch (err) {
            console.error(err);
            setError('Error removing item from cart');
        }
    };

    if (loading) return <div className="text-center">Loading...</div>;
    if (error) return <div className="alert alert-danger text-center">{error}</div>;

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <div className="card p-4" style={{ maxWidth: '500px', width: '100%' }}>
                <h2 className="text-center mb-4">Your Cart</h2>
                {cartItems.length === 0 ? (
                    <p className="text-center">No items in cart</p>
                ) : (
                    <ul className="list-group mb-4">
                        {cartItems.map(item => (
                            <li key={item.productId} className="list-group-item d-flex justify-content-between align-items-center">
                                <span>Product ID: {item.productId} - Quantity: {item.quantity}</span>
                                <button 
                                    onClick={() => handleRemoveFromCart(item.productId)} 
                                    className="btn btn-danger btn-sm">
                                    Remove
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
                <div className="d-flex justify-content-between align-items-center">
                    <button 
                        onClick={() => window.location.href = '/checkout'} 
                        className="btn btn-primary w-100">
                        Proceed to Checkout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
