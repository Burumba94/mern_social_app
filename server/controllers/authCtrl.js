const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { body, validationResult } = require('express-validator');

// Load environment variables from .env file
dotenv.config();

// Import User model
const User = require('../models/User');

// Register route
exports.register = [
  // Input validation and sanitization using express-validator
  body('name', 'Name is required').not().isEmpty(),
  body('email', 'Email is required').isEmail(),
  body('password', 'Password is required').not().isEmpty(),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Check if the user already exists
      const existingUser = await User.findOne({ email: req.body.email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }

      // Create a new user
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
      });

      // Hash the password using bcrypt
      newUser.setPassword(req.body.password);

      // Save the user to the database
      await newUser.save();

      // Generate a JWT token
      const token = jwt.sign(
        { userId: newUser._id },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      // Send the token as a response
      res.status(201).json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Internal Server Error' });
    }
  },
];

// Login route
exports.login = [
  // Input validation and sanitization using express-validator
  body('email', 'Email is required').isEmail(),
  body('password', 'Password is required').not().isEmpty(),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Find the user by email
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }

      // Check if the password is correct
      const isPasswordValid = user.checkPassword(req.body.password);
      if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }

      // Generate a JWT token
      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      // Send the token as a response
      res.status(200).json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Internal Server Error' });
    }
  },
];