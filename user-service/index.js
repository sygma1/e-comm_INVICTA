const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8081;

app.use(express.json());

mongoose.connect('mongodb://mongo-service:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.error('DB connection error:', error));;

app.use('/api/users', userRoutes);

app.listen(PORT, () => {
  console.log(`User Service listening on port ${PORT}`);
});

app.get('/test', (req, res) => {
  const connectionStatus = mongoose.connection.readyState; // 0 = disconnected, 1 = connected
  res.send(`MongoDB Connection Status: ${connectionStatus}`);
});

app.post('/api/users/register', async (req, res) => {
  try {
      console.log('Registration data received:', req.body);  // Log the received data
      // Handle user registration logic here (e.g., database insert)
      const newUser = await User.create(req.body);
      res.status(201).json(newUser);  // Send successful response
  } catch (error) {
      console.error('Error in user-service:', error.message);  // Log error details
      res.status(500).json({ message: 'Error registering user' });
  }
});

app.get('/hello', (req, res) => {
  res.send('Hello, world!');
});