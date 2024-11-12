import React, { useState, useEffect } from 'react';
import { loginUser } from '../services/api';
import { useHistory, useLocation } from 'react-router-dom';

const Login = () => {
    const [userData, setUserData] = useState({ username: '', password: '' });
    const [message, setMessage] = useState('');
    const history = useHistory();
    const location = useLocation();

    // If redirected from a protected route, get the intended path
    const redirectPath = location.state?.from || '/productlist';

    useEffect(() => {
        if (location.state?.username && location.state?.password) {
            setUserData({
                username: location.state.username,
                password: location.state.password,
            });
        }
    }, [location.state]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await loginUser(userData); // Login API call
            setMessage('Login successful');

            // Store user data in localStorage (e.g., username, token, etc.)
            localStorage.setItem('user', JSON.stringify(response.data));
            localStorage.setItem('userId', response.data.user._id);

            // Redirect to the intended page or product list
            history.push(redirectPath);
        
        } catch (error) {
            setMessage(error.response?.data?.message || 'Login failed');
            console.error('Login error:', error);
        }
    };

    const handleRegisterRedirect = () => {
        history.push('/register'); // Redirect to register page
    };

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <div className="card p-4 shadow" style={{ width: '100%', maxWidth: '400px' }}>
                <h2 className="text-center mb-4">Login</h2>
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
                                value={userData.username}
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
                                value={userData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Login</button>
                </form>
                {message && <div className="mt-3 alert alert-info">{message}</div>}

                {/* Register Redirect */}
                <div className="mt-3 text-center">
                    <p>Don't have an account?</p>
                    <button
                        type="button"
                        className="btn btn-secondary w-100"
                        onClick={handleRegisterRedirect}
                    >
                        Register
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
