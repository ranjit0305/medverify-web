import axios from 'axios';

const API_URL = 'http://localhost:5000/api/manufacturer';

// Register Manufacturer
export const manufacturerRegister = async (name, email, password, companyName) => {
  const res = await axios.post(`${API_URL}/signup`, { name, email, password, companyName });
  return res.data;
};

// Login Manufacturer
export const manufacturerLogin = async (email, password) => {
  const res = await axios.post(`${API_URL}/login`, { email, password });
  return res.data;
};
