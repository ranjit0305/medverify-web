const bcrypt = require('bcrypt');
const Manufacturer = require('../models/Manufacturer');

// Manufacturer Signup
const signup = async (req, res) => {
  try {
    const { name, email, password, companyName } = req.body;

    const existingManufacturer = await Manufacturer.findOne({ email });
    if (existingManufacturer) {
      return res.status(400).json({ message: 'Manufacturer already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newManufacturer = new Manufacturer({
      name,
      email,
      password: hashedPassword,
      companyName,
    });

    await newManufacturer.save();

    res.status(201).json({ message: 'Manufacturer created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Manufacturer Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const manufacturer = await Manufacturer.findOne({ email });
    if (!manufacturer) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, manufacturer.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = 'generated_jwt_token'; // Replace with actual JWT token logic
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { signup, login };
