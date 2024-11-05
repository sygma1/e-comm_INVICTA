import React from 'react';

const Header = () => {
  return (
    <header>
      <h1>E-Commerce App</h1>
      <nav>
        <a href="/">Home</a>
        <a href="/cart">Cart</a>
        <a href="/login">Login</a>
        <a href="/register">Register</a>
      </nav>
    </header>
  );
};

export default Header;
