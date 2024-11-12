import React, { useEffect, useState } from 'react';
import { getCartItems, removeFromCart } from '../services/api'; // You need to implement these API calls

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCartItems = async () => {
            const userId = 'some-user-id';  // Replace this with the actual userId
            try {
                const response = await getCartItems(userId);  // Pass userId to the API
                setCartItems(response.data);
            } catch (err) {
                setError('Error fetching cart items');
            } finally {
                setLoading(false);
            }
        };
    
        fetchCartItems();
    }, []);

    const handleRemoveFromCart = async (itemId) => {
        try {
            await removeFromCart(itemId); // Remove item from backend
            setCartItems(cartItems.filter(item => item.id !== itemId));
        } catch (err) {
            setError('Error removing item from cart');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h2>Your Cart</h2>
            {cartItems.length === 0 ? (
                <p>No items in cart</p>
            ) : (
                <ul>
                    {cartItems.map(item => (
                        <li key={item.id}>
                            {item.name} - ${item.price}
                            <button onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
                        </li>
                    ))}
                </ul>
            )}
            <button onClick={() => window.location.href = '/checkout'}>Proceed to Checkout</button>
        </div>
    );
};

export default Cart;
