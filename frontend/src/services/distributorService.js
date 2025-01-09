import axios from 'axios';

const API_URL = 'http://localhost:5000/api/distributor';

// Login distributor
export const distributorLogin = async (email, password) => {
  const res = await axios.post(`${API_URL}/login`, { email, password });
  return res.data;
};

// Register distributor
export const distributorRegister = async (name, email, password, companyName) => {
  const res = await axios.post(`${API_URL}/signup`, { name, email, password, companyName });
  return res.data;
};
