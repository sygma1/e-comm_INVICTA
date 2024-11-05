import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Register from './components/Register';
import Login from './components/Login';
import Cart from './components/Cart';
import Checkout from './components/Checkout';

const App = () => {
    return (
        <Router>
            <div>
                <Switch>
                    <Route path="/" component={Login} />
                    <Route path="/register" component={Register} />
                    <Route path="/productlist" exact component={ProductList} />
                    <Route path="/product/:id" component={ProductDetail} />
                    <Route path="/cart" component={Cart} />
                    <Route path="/checkout" component={Checkout} />
                </Switch>
            </div>
        </Router>
    );
};

export default App;
