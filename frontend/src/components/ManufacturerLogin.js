import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { manufacturerLogin } from '../services/manufacturerService';  // Import the manufacturerLogin function

const ManufacturerLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await manufacturerLogin(email, password); // Use the function from manufacturerService
      if (response.token) {
        localStorage.setItem('token', response.token); // Store JWT token
        navigate('/manufacturer-dashboard'); // Redirect to manufacturer dashboard
      }
    } catch (error) {
      setError(error.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div>
      <h2>Manufacturer Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default ManufacturerLogin;
