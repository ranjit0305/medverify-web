import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ManufacturerLoginPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const manufacturer = { email, password, name, companyName };

    try {
      if (isSignUp) {
        // Manufacturer Signup Logic
        const response = await axios.post('http://localhost:5000/api/manufacturer/signup', manufacturer);
        console.log(response.data);
        navigate('/manufacturer-login'); // Redirect to manufacturer login after signup
      } else {
        // Manufacturer Login Logic
        const response = await axios.post('http://localhost:5000/api/manufacturer/login', { email, password });
        if (response.data.token) {
          localStorage.setItem('authToken', response.data.token);
          navigate('/manufacturer-dashboard'); // Redirect to manufacturer dashboard after login
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials or signup failed');
    }
  };

  return (
    <div className="login-container">
      <h2>{isSignUp ? 'Manufacturer Sign Up' : 'Manufacturer Login'}</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        {isSignUp && (
          <>
            <div>
              <label>Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label>Company Name</label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
                placeholder="Enter your company name"
              />
            </div>
          </>
        )}
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
          />
        </div>
        <button type="submit">{isSignUp ? 'Sign Up' : 'Login'}</button>
      </form>
      <button onClick={() => setIsSignUp(!isSignUp)}>
        {isSignUp ? 'Already have an account? Login' : 'Create a new account'}
      </button>
    </div>
  );
};

export default ManufacturerLoginPage;
