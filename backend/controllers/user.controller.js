const User = require('../models/user.model');
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



const Signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      
    });

    await newUser.save();

    res.status(201).json({
      status : "OK",
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    res.status(500).json({ 
      status : "Failed",
      message: "Server error", error: error.message });
  }
};


const login = async(req,res)=>{
    try {
        const { email, password } = req.body;
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
              status : "Failed",
              message: 'Invalid email or password' });
        }
        // Compare the password
        const isMatch = await bcrypt.compare(password, user.password);  
        if (!isMatch) {
            return res.status(400).json({
              status : "Failed",
              message: 'Invalid email or password' });
        }

        const token = jwt.sign({ userId: user._id} , process.env.JWT_SECRET, { expiresIn: '1h' })
        
        res.status(200).json({ 
           status : "OK",
            message: 'Login successful',
            token,
            user : user.name,
            role : user.role
         });
    } catch (error) {
        res.status(500).json({ 
          status : "Failed",
          message: 'Server error', error });
    }
}


const AdminLogin = async(req,res)=>{
    try {
        const { email, password } = req.body;
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
              status : "Failed",
              message: 'Invalid email or password' });
        }
        // Compare the password
        const isMatch = await bcrypt.compare(password, user.password);  
        if (!isMatch) {
            return res.status(400).json({
              status : "Failed",
              message: 'Invalid email or password' });
        }

        if(user.role !== 'admin'){
            return res.status(403).json({
                status : "Failed",
                message: 'Access denied' });
        }

        const token = jwt.sign({ userId: user._id} , process.env.JWT_SECRET, { expiresIn: '1h' })
        
        res.status(200).json({ 
           status : "OK",
            message: 'Login successful',
            token,
            user : user.name
         });
    } catch (error) {
        res.status(500).json({ 
          status : "Failed",
          message: 'Server error', error });
    }
}

module.exports = { Signup,login , AdminLogin };
