const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());

mongoose.connect('mongodb://mongo-user:password@mongo:27017/users', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/api/users', userRoutes);

app.listen(PORT, () => {
  console.log(`User Service listening on port ${PORT}`);
});
