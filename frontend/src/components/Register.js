import React, { useState } from 'react';
import { registerUser } from '../services/api';

const Register = () => {
    const [userData, setUserData] = useState({ username: '', password: '',email: '' });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await registerUser(userData);
            setMessage('Registration successful');
        } catch (error) {
            setMessage('Registration failed');
            alert(error);
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                <button type="submit">Register</button>
            </form>
            {message && <div>{message}</div>}
        </div>
    );
};

export default Register;
