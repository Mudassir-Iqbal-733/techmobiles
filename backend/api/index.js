// index.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const serverless = require('serverless-http');

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
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

// Routes
app.get('/', (req, res) => {
  res.send('🚀 Hello from Express on Vercel!');
});
app.use('/products', productRoutes);
app.use('/user', userRoutes);
app.use('/order', orderRoutes);
app.use('/admin', dashboardRouter);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log('✅ Connected to MongoDB'),
   app.listen(process.env.PORT)) 
  .catch((error) => console.error('❌ Error connecting to MongoDB:', error));

// Export for Vercel serverless
module.exports = app;
module.exports.handler = serverless(app);
