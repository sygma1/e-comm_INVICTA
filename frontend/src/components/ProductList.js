// src/components/ProductList.js
import React, { useEffect, useState, useContext } from 'react';
import { getProducts, addToCart, removeFromCart, getCartItems } from '../services/api'; // Import getCartItems
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [cartItems, setCartItems] = useState([]); // State for tracking cart items
  const { userId } = useContext(AuthContext);

  // Fetch products and user's cart items
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        setProducts(response.data);
      } catch (err) {
        setError('Error fetching products');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    const fetchCartItems = async () => {
      const userId = localStorage.getItem('userId');
      if (userId) {
        try {
          const cartResponse = await getCartItems(userId); // Fetch user's cart
          setCartItems(cartResponse.data.items || []);
        } catch (err) {
          console.error('Error fetching cart items', err);
        }
      }
    };

    fetchProducts();
    fetchCartItems();
  }, []);

  // Check if a product is in the cart
  const isInCart = (productId) => {
    return cartItems.some(item => item.productId === productId);
  };

  const handleAddToCart = async (productId) => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      console.log('User is not authenticated.');
      return;
    }

    try {
      const response = await addToCart({
        userId,
        items: [
          {
            productId: productId,
            quantity: 1,
          },
        ],
      });
      console.log('Product added to cart:', response.data);
      setCartItems([...cartItems, { productId, quantity: 1 }]); // Update cart state
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add product to cart');
    }
  };

  const handleRemoveFromCart = async (productId) => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      console.log('User is not authenticated.');
      return;
    }

    try {
      // Use the API Gateway for removing from the cart
      const response = await removeFromCart(userId, productId); // This goes through the API Gateway
      console.log('Product removed from cart:', response.data);
      setCartItems(cartItems.filter(item => item.productId !== productId)); // Update cart state
    } catch (error) {
      console.error('Error removing from cart:', error);
      alert('Failed to remove product from cart');
    }
  };

  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    );

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Products</h2>
      <div className="row">
        {products.map((product) => (
          <div className="col-md-4" key={product._id}>
            <div className="card mb-4">
              <img src={product.image} className="card-img-top" alt={product.name} />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">Price: ${product.price}</p>
                <Link to={`/product/${product._id}`} className="btn btn-primary">
                  <i className="bi bi-eye"></i> View Details
                </Link>
                {isInCart(product._id) ? (
                  <button
                    className="btn btn-danger mt-2"
                    onClick={() => handleRemoveFromCart(product._id)} // Corrected to use the API Gateway
                  >
                    Remove from Cart
                  </button>
                ) : (
                  <button
                    className="btn btn-success mt-2"
                    onClick={() => handleAddToCart(product._id)} // Corrected to use the API Gateway
                  >
                    Add to Cart
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
