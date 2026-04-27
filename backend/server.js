require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const itemRoutes = require('./routes/itemRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI || process.env.MONGODB_URI === 'your_mongodb_connection_string_here') {
      console.warn('⚠️ WARNING: MONGODB_URI is not set or is using the placeholder.');
      console.warn('Please update the .env file with your valid MongoDB connection string.');
      // Comment out process.exit if you want the server to stay up without a DB
      // process.exit(1); 
    } else {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log('MongoDB connected successfully');
    }
  } catch (err) {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1);
  }
};

connectDB();

// Routes
app.use('/api/items', itemRoutes);

// Health check endpoint
app.get('/', (req, res) => {
  res.send('API is running...');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
