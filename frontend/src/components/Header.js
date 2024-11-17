import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Ensure you import the Bootstrap icons

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const history = useHistory();

  // Check if the user is logged in
  useEffect(() => {
    const user = localStorage.getItem('user');
    setIsAuthenticated(!!user); // Set authentication state based on localStorage
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user'); // Remove user info from localStorage
    setIsAuthenticated(false); // Update state
    history.push('/login'); // Redirect to login page
  };

  return (
    <header className="bg-light shadow-sm">
      <nav className="navbar navbar-expand-lg navbar-light container">
        <Link to="/productlist" className="navbar-brand d-flex align-items-center text-dark">
          <i className="bi bi-bag me-2"></i> E-Commerce App
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to="/productlist" className="nav-link text-dark px-3">
                <i className="bi bi-house me-2"></i> Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/cart" className="nav-link text-dark px-3">
                <i className="bi bi-cart me-2"></i> Cart
              </Link>
            </li>
            {isAuthenticated ? (
              <li className="nav-item">
                <button
                  className="btn btn-danger nav-link d-flex align-items-center px-3 py-1"
                  onClick={handleLogout}
                  style={{ border: 'none', background: 'none' }}
                >
                  <i className="bi bi-box-arrow-right me-2"></i> Logout
                </button>
              </li>
            ) : (
              <li className="nav-item">
                <Link to="/login" className="nav-link text-dark px-3">
                  <i className="bi bi-box-arrow-in-right me-2"></i> Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
