import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Mock login
    navigate('/questionnaire');
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <button onClick={handleLogin}>Log In</button>
    </div>
  );
};

export default LoginPage;