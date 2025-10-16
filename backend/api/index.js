// index.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const serverless = require('serverless-http');
const connectDB = require('../config/db');

// Routes
const productRoutes = require('../routes/products.route');
const userRoutes = require('../routes/user.route');
const orderRoutes = require('../routes/order.route');
const dashboardRouter = require('../routes/admin/dashboard.route');

const app = express();

// ✅ Apply CORS first (before routes)
app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    "https://techmobiles-frontend.vercel.app",
    "https://techmobiles-admin-seven.vercel.app"
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Routes
app.use('/products', productRoutes);
app.use('/user', userRoutes);
app.use('/order', orderRoutes);
app.use('/admin', dashboardRouter);

// ✅ Root route
app.get('/', (req, res) => {
  res.send('🚀 TechMobiles Backend is Running with CORS Enabled!');
});

// ✅ Connect DB (only once)
connectDB();

// ❌ REMOVE app.listen() – not used on Vercel

// ✅ Export handler for Vercel
module.exports = app;
module.exports.handler = serverless(app);
