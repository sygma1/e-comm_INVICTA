const express = require('express');
const Cart = require('../models/Cart');

const router = express.Router();

// Add item to cart
router.post('/', async (req, res) => {
  const cart = new Cart(req.body);
  try {
    await cart.save();
    res.status(201).send(cart);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get cart items
router.get('/:userId', async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    res.send(cart);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
