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

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://techmobiles-frontend.vercel.app",
    "https://techmobiles-admin-seven.vercel.app"
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

connectDB();
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});

app.get('/', (req, res) => {
  res.send('🚀 Hello from Express + MongoDB on Vercel!');
});

app.use('/products', productRoutes);
app.use('/user', userRoutes);
app.use('/order', orderRoutes);
app.use('/admin', dashboardRouter);

// Export for Vercel serverless
module.exports = app;
module.exports.handler = serverless(app);