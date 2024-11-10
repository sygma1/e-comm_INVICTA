import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import 'bootstrap-icons/font/bootstrap-icons.css'; // Import Bootstrap Icons CSS
import React from 'react';
import { BrowserRouter as Router, Route, Switch, useLocation } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Register from './components/Register';
import Login from './components/Login';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Header from './components/Header';

const App = () => {
  return (
    <Router>
      <Main />
    </Router>
  );
};

const Main = () => {
  const location = useLocation(); // Use location inside a component rendered by Router
  
  return (
    <div>
      {/* Conditionally render Header only if the path is not login or register */}
      {location.pathname !== '/login' && location.pathname !== '/register' && <Header />}
      <Switch>
        <Route path="/login" exact render={() => <Login />} />
        <Route path="/register" exact render={() => <Register />} />
        <Route path="/productlist" exact render={() => <ProductList />} />
        <Route path="/product/:id" exact render={() => <ProductDetail />} />
        <Route path="/cart" exact render={() => <Cart />} />
        <Route path="/checkout" exact render={() => <Checkout />} />
      </Switch>
    </div>
  );
};

export default App;
