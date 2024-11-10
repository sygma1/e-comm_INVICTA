import React, { useState } from 'react';
import { registerUser } from '../services/api';
import { useHistory } from 'react-router-dom';

const Register = () => {
    const [userData, setUserData] = useState({ username: '', password: '', email: '' });
    const [message, setMessage] = useState('');
    const history = useHistory();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await registerUser(userData); // Send registration request
            console.log('Registration successful:', response); // Log response (optional)
            setMessage('Registration successful');
            // Redirect to login page and pass user data as state
            history.push({
                pathname: '/login',
                state: { username: userData.username, password: userData.password },
            });
        } catch (error) {
            setMessage('Registration failed');
            console.error('Registration error:', error);
        }
    };

    const handleLoginRedirect = () => {
        history.push('/login'); // Redirect to the login page
    };

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <div className="card p-4 shadow" style={{ width: '100%', maxWidth: '400px' }}>
                <h2 className="text-center mb-4">Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3 position-relative">
                        <label htmlFor="username" className="form-label">Username</label>
                        <div className="input-group">
                            <span className="input-group-text"><i className="bi bi-person"></i></span>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                className="form-control"
                                placeholder="Enter your username"
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="mb-3 position-relative">
                        <label htmlFor="password" className="form-label">Password</label>
                        <div className="input-group">
                            <span className="input-group-text"><i className="bi bi-lock"></i></span>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className="form-control"
                                placeholder="Enter your password"
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="mb-3 position-relative">
                        <label htmlFor="email" className="form-label">Email</label>
                        <div className="input-group">
                            <span className="input-group-text"><i className="bi bi-envelope"></i></span>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="form-control"
                                placeholder="Enter your email"
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Register</button>
                </form>
                {message && <div className="mt-3 alert alert-info">{message}</div>}

                {/* Login Button */}
                <div className="mt-3 text-center">
                    <p>Already have an account?</p>
                    <button
                        type="button"
                        className="btn btn-secondary w-100"
                        onClick={handleLoginRedirect}
                    >
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Register;
