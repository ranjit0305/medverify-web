import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

// Login user
export const login = async (email, password) => {
  const res = await axios.post(`${API_URL}/login`, { email, password });
  return res.data;
};

// Register user
export const register = async (name, email, password, role) => {
  const res = await axios.post(`${API_URL}/register`, { name, email, password, role });
  return res.data;
};
