import React from 'react';
import { useNavigate } from 'react-router-dom';
// import login from './wildhacks_log_in.svg';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    // mock login logic
    navigate('/questionnaire/start');
  };

  return (
    <div>
      <img src="./public/wildhacks_log_in.svg" alt="Urban Grower Logo" style={{ width: "160px", marginBottom: "1rem" }} />
      <h1>Login</h1>
      
      <button onClick={handleLogin}>Log In</button>
    </div>
  );
};

export default LoginPage;