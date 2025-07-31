const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const authRoutes = require('./Routes/authRoute');
const noteRoutes = require('./Routes/noteRoutes');

const app = express();

// ✅ Middleware to parse JSON
app.use(express.json());

// ✅ Route middlewares
app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);

// ✅ Connect to MongoDB and start server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(5000, () => console.log('Server running on port 5000'));
  })
  .catch((err) => console.log(err));
