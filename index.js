const express = require('express');
const serverless = require('serverless-http');
const mongoose = require('mongoose');
require('dotenv').config();

const authRoutes = require('../routes/authRoute');
const noteRoutes = require('../routes/noteRoutes');

const app = express();

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);

// Mongo connection (make sure it's only called once)
mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log('MongoDB connected');
});

module.exports.handler = serverless(app);
