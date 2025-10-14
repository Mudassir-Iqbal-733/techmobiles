const express = require("express");


const orderRouter = express.Router();
const  { createOrder, getOrdersByUserId } = require("../controllers/order.controller");
const {AuthCheck }= require("../middlewares/auth.middleware");


orderRouter.post("/create", AuthCheck, createOrder);
orderRouter.get('/user-orders', AuthCheck, getOrdersByUserId);
// userRouter.post("/delete", Login);


module.exports = orderRouter;