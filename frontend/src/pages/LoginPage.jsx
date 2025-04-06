import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/catnip_logo.png';
import introBackground from '../assets/intro_page_bg.PNG';
import '../styling/Login.css';
import { loginUser } from '../services/api';

const LoginPage = () => {
  const navigate = useNavigate();
  const [showSignup, setShowSignup] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPhone = (phone) => /^\d{10}$/.test(phone);
  const isValidPassword = (password) => password.length >= 6;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
  
    if (!isValidEmail(formData.email)) {
      setError('Please enter a valid email address.');
      return;
    }
  
    if (!isValidPhone(formData.phone)) {
      setError('Please enter a 10-digit phone number.');
      return;
    }
  
    if (!isValidPassword(formData.password)) {
      setError('Password must be at least 6 characters long.');
      return;
    }
  
    const userPayload = {
      username: formData.name,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
    };
  
    try {
      const user = await loginUser({
        username: userPayload.username,
        password: userPayload.password,
      });
  
      localStorage.setItem('user_id', user.user_id);
    } catch (err) {
      console.warn('Login failed. Using fallback user_id = 1');
      localStorage.setItem('user_id', 1);
    }
  
    navigate('/questionnaire/start');
  };  

  return (
    <div
      className="login-page"
      style={{ backgroundImage: `url(${introBackground})` }}
    >
      <div className="login-card">
        <img src={logo} alt="Urban Grower Logo" className="logo-img" />
        <h1 className="login-title">Welcome to Urban Grower</h1>
        <p className="login-subtitle">Create an account or sign in below.</p>

        {!showSignup ? (
          <button onClick={() => setShowSignup(true)} className="login-button">
            Sign In / Sign Up
          </button>
        ) : (
          <form className="login-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Username"
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
            />
            {error && <p className="login-error">{error}</p>}
            <button type="submit" className="login-button">
              Continue
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
