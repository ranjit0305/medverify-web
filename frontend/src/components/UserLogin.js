import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Use `useNavigate` for React Router v6+

const UserLogin = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();  // useNavigate() for React Router v6+

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Conditionally include 'name' only for signup
    const user = isSignUp ? { email, password, name } : { email, password };

    try {
      if (isSignUp) {
        // Sign up logic (make sure it's a POST request)
        const response = await axios.post('http://localhost:5000/api/auth/signup', user);
        console.log(response.data);
        navigate('/login'); // Redirect to login page after successful signup
      } else {
        // Login logic
        const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
        if (response.data.token) {
          localStorage.setItem('authToken', response.data.token);
          navigate('/dashboard'); // Redirect to user dashboard after login
        }
      }
    } catch (err) {
      setError('Invalid credentials or signup failed');
    }
  };

  return (
    <div className="login-container">
      <h2>{isSignUp ? 'Sign Up' : 'Login'}</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        {isSignUp && (
          <div>
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        )}
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
        <button type="submit">{isSignUp ? 'Sign Up' : 'Login'}</button>
      </form>
      <button onClick={() => setIsSignUp(!isSignUp)}>
        {isSignUp ? 'Already have an account? Login' : 'Create a new account'}
      </button>
    </div>
  );
};

export default UserLogin;
