// config/db.js
const mongoose = require('mongoose');

let isConnected = false; // connection state

async function connectDB() {
  if (isConnected) {
    console.log(' Using existing MongoDB connection');
    return;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL);
    isConnected = true;
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(' MongoDB connection error:', error.message);
    throw error;
  }
}

module.exports = connectDB;
