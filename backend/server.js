require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');  // Import auth routes
const distributorRoutes = require('./routes/distributor'); // Import distributor routes
const manufacturerRoutes = require('./routes/manufacturer');


const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);  // User routes
app.use('/api/distributor', distributorRoutes);  // Distributor routes
app.use('/api/manufacturer', manufacturerRoutes);
// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
