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
        <div className="container mt-4">
            <h2>Checkout</h2>
            <form onSubmit={handleCheckout} className="mt-4">
                <div className="mb-3">
                    <label htmlFor="shippingAddress" className="form-label">Shipping Address:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="shippingAddress"
                        value={shippingAddress}
                        onChange={(e) => setShippingAddress(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="cardNumber" className="form-label">Card Number:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="cardNumber"
                        value={paymentInfo.cardNumber}
                        onChange={(e) => setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value })}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="expiration" className="form-label">Expiration Date:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="expiration"
                        value={paymentInfo.expiration}
                        onChange={(e) => setPaymentInfo({ ...paymentInfo, expiration: e.target.value })}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="cvv" className="form-label">CVV:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="cvv"
                        value={paymentInfo.cvv}
                        onChange={(e) => setPaymentInfo({ ...paymentInfo, cvv: e.target.value })}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Complete Purchase</button>
            </form>
            {message && <div className="mt-3 alert alert-info">{message}</div>}
        </div>
    );
};

export default Checkout;
