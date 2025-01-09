const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Distributor = require('../models/Distributor');

// Distributor Signup controller
const signup = async (req, res) => {
  try {
    const { email, password, name, companyName } = req.body;

    // Validate fields
    if (!email || !password || !name || !companyName) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if the distributor already exists
    const existingDistributor = await Distributor.findOne({ email });
    if (existingDistributor) {
      return res.status(400).json({ message: 'Distributor already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new distributor
    const newDistributor = new Distributor({ name, email, password: hashedPassword, companyName });
    await newDistributor.save();

    res.status(201).json({ message: 'Distributor created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Distributor Login controller
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate fields
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Check if distributor exists
    const distributor = await Distributor.findOne({ email });
    if (!distributor) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare the password
    const isMatch = await bcrypt.compare(password, distributor.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { distributorId: distributor._id, email: distributor.email },
      process.env.JWT_SECRET, // Secret key from environment variables
      { expiresIn: '1h' } // Expiry of 1 hour
    );

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { signup, login };
