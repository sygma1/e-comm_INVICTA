import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const history = useHistory();

  // Check if the user is logged in
  useEffect(() => {
    const user = localStorage.getItem('user');
    setIsAuthenticated(!!user);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user'); // Remove user info from localStorage
    setIsAuthenticated(false); // Update state
    history.push('/login'); // Redirect to home page
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand d-flex align-items-center">
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
                <Link to="/" className="nav-link d-flex align-items-center">
                  <i className="bi bi-house me-1"></i> Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/cart" className="nav-link d-flex align-items-center">
                  <i className="bi bi-cart me-1"></i> Cart
                </Link>
              </li>
              {isAuthenticated ? (
                <li className="nav-item">
                  <button
                    className="btn btn-danger nav-link d-flex align-items-center"
                    onClick={handleLogout}
                    style={{ border: 'none', background: 'none' }}
                  >
                    <i className="bi bi-box-arrow-right me-1"></i> Logout
                  </button>
                </li>
              ) : (
                <>
                  <li className="nav-item">
                    <Link to="/login" className="nav-link d-flex align-items-center">
                      <i className="bi bi-box-arrow-in-right me-1"></i> Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/register" className="nav-link d-flex align-items-center">
                      <i className="bi bi-person-plus me-1"></i> Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
