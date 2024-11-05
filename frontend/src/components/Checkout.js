import React, { useState } from 'react';
import { checkout } from '../services/api'; // You need to implement this API call

const Checkout = () => {
    const [shippingAddress, setShippingAddress] = useState('');
    const [paymentInfo, setPaymentInfo] = useState({ cardNumber: '', expiration: '', cvv: '' });
    const [message, setMessage] = useState('');

    const handleCheckout = async (e) => {
        e.preventDefault();
        try {
            const response = await checkout({ shippingAddress, paymentInfo });
            setMessage('Checkout successful! Your order ID is ' + response.data.orderId);
        } catch (error) {
            setMessage('Checkout failed. Please try again.');
        }
    };

    return (
        <div>
            <h2>Checkout</h2>
            <form onSubmit={handleCheckout}>
                <div>
                    <label>Shipping Address:</label>
                    <input 
                        type="text" 
                        value={shippingAddress} 
                        onChange={(e) => setShippingAddress(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Card Number:</label>
                    <input 
                        type="text" 
                        value={paymentInfo.cardNumber} 
                        onChange={(e) => setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value })} 
                        required 
                    />
                </div>
                <div>
                    <label>Expiration Date:</label>
                    <input 
                        type="text" 
                        value={paymentInfo.expiration} 
                        onChange={(e) => setPaymentInfo({ ...paymentInfo, expiration: e.target.value })} 
                        required 
                    />
                </div>
                <div>
                    <label>CVV:</label>
                    <input 
                        type="text" 
                        value={paymentInfo.cvv} 
                        onChange={(e) => setPaymentInfo({ ...paymentInfo, cvv: e.target.value })} 
                        required 
                    />
                </div>
                <button type="submit">Complete Purchase</button>
            </form>
            {message && <div>{message}</div>}
        </div>
    );
};

export default Checkout;
