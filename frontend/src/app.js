import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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
            <div>
                <Header /> {/* Make sure this is rendered */}
                <Switch>
                    <Route path="/login" exact render={() => <Login />} />
                    <Route path="/register" exact render={() => <Register />} />
                    <Route path="/productlist" exact render={() => <ProductList />} />
                    <Route path="/product/:id" exact render={() => <ProductDetail />} />
                    <Route path="/cart" exact render={() => <Cart />} />
                    <Route path="/checkout" exact render={() => <Checkout />} />
                </Switch>
            </div>
        </Router>
    );
};

export default App;
