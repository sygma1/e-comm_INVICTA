const express = require('express');
const User = require('../models/user');
const router = express.Router();

// User registration
router.post('/register', async (req, res) => {
  const { username, password, email } = req.body;

  // Log incoming registration data
  console.log("Received registration data:", req.body);

  // Check if all required fields are provided
  if (!username || !password || !email) {
    return res.status(400).send("All fields are required");
  }

  // Check if the username or email already exists
  try {
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).send("Username or email already exists");
    }

    // Create and save new user
    const user = new User(req.body);
    await user.save();

    // Log successful user registration
    console.log("User registered successfully:", user);
    res.status(201).send(user);

  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).send("Internal Server Error");
  }
});

// User login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).send('Invalid credentials');
    }

    // Direct password comparison (no hashing)
    if (user.password !== password) {
      return res.status(401).send('Invalid credentials');
    }

    // Send user data excluding password
    res.send({
      username: user.username,
      email: user.email,
      _id: user._id,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
