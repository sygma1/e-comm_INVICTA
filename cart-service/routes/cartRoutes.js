const express = require('express');
const Cart = require('../models/Cart');

const router = express.Router();


// Add item to cart
router.post('/', async (req, res) => {
  try {
    const { userId, items } = req.body;
    
    // Validate input
    if (!userId || !items || items.length === 0) {
      return res.status(400).json({ message: 'User ID and items are required' });
    }
    
    // Validate each item has a valid productId and quantity
    for (let item of items) {
      if (!item.productId || !item.quantity || item.quantity <= 0) {
        return res.status(400).json({ message: 'Each item must have a valid productId and quantity' });
      }
    }

    // Find the cart by userId
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // Create new cart if it doesn't exist
      cart = new Cart({ userId, items: [] });
    }

    // Add items to the cart
    items.forEach(item => {
      const itemIndex = cart.items.findIndex(cartItem => cartItem.productId.toString() === item.productId.toString());
      if (itemIndex > -1) {
        // Update quantity if the item is already in the cart
        cart.items[itemIndex].quantity += item.quantity;
      } else {
        // Add new item to the cart
        cart.items.push(item);
      }
    });

    // Save the updated cart
    await cart.save();
    res.status(201).json(cart); // Return the updated cart
  } catch (error) {
    console.error('Error adding to cart:', error.message);
    res.status(500).json({ message: 'Error adding product to cart' });
  }
});

// Define the function to get cart items directly in this file
async function getCartItems(userId) {
  try {
    // Replace this with your actual logic to get cart items, such as a database query
    const cartItems = await Cart.find({ userId: userId }); // Assuming you're using a Cart model to query your DB
    return cartItems;
  } catch (err) {
    throw new Error("Unable to fetch cart items");
  }
}

// Get cart items by userId
router.get('/:userId', (req, res) => {
  const userId = req.params.userId;

  // Call the function to get cart items for the given userId
  getCartItems(userId)
    .then(cartItems => {
      res.json(cartItems); // Send the cart items back as a response
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ message: "Failed to load cart items" });
    });
});

router.delete('/:userId/remove', async (req, res) => {
  const { userId } = req.params;
  const { productId } = req.body; // Product ID to remove from cart

  try {
    // Find the cart by userId
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Find the product to remove in the cart
    const productIndex = cart.items.findIndex(item => item.productId.toString() === productId);

    if (productIndex === -1) {
      return res.status(404).json({ message: 'Product not found in cart' });
    }

    // Remove the product from the cart
    cart.items.splice(productIndex, 1);

    // Save the updated cart
    await cart.save();

    // Return the updated cart
    res.status(200).json(cart);
  } catch (error) {
    console.error('Error in cart service:', error.message);
    res.status(500).json({ message: 'Failed to remove item from cart' });
  }
});


module.exports = router;
