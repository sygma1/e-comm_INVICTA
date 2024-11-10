const mongoose = require('mongoose');
const Product = require('./models/Product');  // Ensure the correct path to your Product model

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Data to be inserted
const products = [
  {
    name: "Product 1",
    price: 29.99,
    description: "This is a test product 1.",
    stock: 100,
    image: "https://images.unsplash.com/photo-1506748686212-83ed56c91f22?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGZyYWd8ZW58MHx8fHwxNjgwMTk2MTcz&ixlib=rb-1.2.1&q=80&w=1080" // Real image URL from Unsplash
  },
  {
    name: "Product 2",
    price: 49.99,
    description: "This is a test product 2.",
    stock: 200,
    image: "https://images.unsplash.com/photo-1579276580082-50588ed054d0?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDN8fGJvY2Nvbnl8ZW58MHx8fHwxNjgwMTk2Mjkw&ixlib=rb-1.2.1&q=80&w=1080" // Real image URL from Unsplash
  },
  {
    name: "Product 3",
    price: 69.99,
    description: "This is a test product 3.",
    stock: 150,
    image: "https://images.unsplash.com/photo-1600346014570-8e8194e11c7d?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGNvZmZlZXxlbnwwfHx8fHwxNjgwMTk2NDU5&ixlib=rb-1.2.1&q=80&w=1080" // Real image URL from Unsplash
  }
];

// Insert the test products into the database
Product.insertMany(products)
  .then(() => {
    console.log('Test data inserted successfully');
    mongoose.disconnect();  // Disconnect after insertion
  })
  .catch(err => {
    console.error('Error inserting data:', err);
    mongoose.disconnect();
  });
