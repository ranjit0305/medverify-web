const mongoose = require('mongoose');

const distributorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  companyName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model('Distributor', distributorSchema);
