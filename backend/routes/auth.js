const express = require('express');
const { signup, login } = require('../controllers/authController');
const router = express.Router();

// Define signup and login routes
router.post('/signup', signup);  // POST route for signup
router.post('/login', login);    // POST route for login

module.exports = router;
