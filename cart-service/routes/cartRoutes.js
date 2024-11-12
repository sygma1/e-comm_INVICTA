const express = require('express');
const Cart = require('../models/Cart');

const router = express.Router();


// Add item to cart
router.post('/', async (req, res) => {
  try {
    const { userId, items } = req.body;
    if (!userId || !items || items.length === 0) {
      return res.status(400).json({ message: 'User ID and items are required' });
    }

    // Find the cart by userId
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // Create new cart if it doesn't exist
      cart = new Cart({ userId, items: [] });
    }

    // Add items to the cart
    items.forEach(item => {
      const itemIndex = cart.items.findIndex(cartItem => cartItem.productId.toString() === item.productId);
      if (itemIndex > -1) {
        // Update quantity if the item is already in the cart
        cart.items[itemIndex].quantity += item.quantity;
      } else {
        // Add new item to the cart
        cart.items.push(item);
      }
    });

    // Save the cart
    await cart.save();
    res.status(201).json(cart); // Return the updated cart
  } catch (error) {
    console.error('Error adding to cart:', error.message);
    res.status(500).json({ message: 'Error adding product to cart' });
  }
});

// Get cart items by userId
router.get('/', async (req, res) => {
  const { userId } = req.query; // Retrieve userId from the query parameters

  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  try {
    // Assuming you have a Cart model with a `findOne` method to get a cart by userId
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found for this user' });
    }

    res.json(cart.items); // Assuming the cart has an 'items' field for products
  } catch (error) {
    console.error('Error fetching cart items:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.delete('/', async (req, res) => {
  const { userId, productId } = req.query; // Get userId and productId from query parameters

  if (!userId || !productId) {
    return res.status(400).json({ message: 'User ID and Product ID are required' });
  }

  try {
    // Find the user's cart and remove the product
    const result = await CartModel.findOneAndUpdate(
      { userId }, 
      { $pull: { items: { productId } } }, // Pull (remove) the product from the cart
      { new: true }
    );

    if (!result) {
      return res.status(404).json({ message: 'Product not found in cart' });
    }

    res.json({ message: 'Product removed from cart' });
  } catch (error) {
    console.error('Error removing product from cart:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


module.exports = router;
