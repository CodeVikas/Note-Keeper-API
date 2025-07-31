const express = require('express');
const serverless = require('serverless-http');
const mongoose = require('mongoose');
require('dotenv').config();

const authRoutes = require('./Routes/authRoute');
const noteRoutes = require('./Routes/noteRoutes');

const app = express();

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);

// ✅ Global Mongoose connection reuse
let conn = null;

async function connectToDatabase() {
  if (conn) return conn;
  conn = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  return conn;
}

// ⛔️ Don't connect directly at top level for serverless
app.use(async (req, res, next) => {
  try {
    await connectToDatabase();
    next();
  } catch (error) {
    console.error('MongoDB Connection Error:', error);
    return res.status(500).json({ error: 'Database connection failed' });
  }
});

module.exports.handler = serverless(app);
