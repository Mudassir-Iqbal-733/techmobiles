require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const productRoutes = require('./routes/products.route');
const userRoutes = require("./routes/user.route")
const orderRoutes = require("./routes/order.route");
const dashboardRouter = require('./routes/admin/dashboard.route');



const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

  app.get('/', (req, res) => {
      res.send('Hello from Express on Vercel!');
    });


app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));


app.use('/api/products', productRoutes);
app.use('/api/user', userRoutes );
app.use('/api/order', orderRoutes );

app.use('/api/admin', dashboardRouter );

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT)
}).catch((error) => {
    console.error("Error connecting to MongoDB:", error);
});

module.exports = app;