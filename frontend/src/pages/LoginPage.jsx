// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import logo from '../assets/catnip_logo.png';
// import introBackground from '../assets/intro_page_bg.PNG';
// import '../styling/Login.css';
// import { createUser, loginUser } from '../services/api';

// const LoginPage = () => {
//   const navigate = useNavigate();
//   const [showSignup, setShowSignup] = useState(false);
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     password: '',
//   });
//   const [error, setError] = useState('');

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const isValidEmail = (email) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   };

//   const isValidPhone = (phone) => {
//     const phoneRegex = /^\d{10}$/; // basic 10-digit validation
//     return phoneRegex.test(phone);
//   };

//   const isValidPassword = (password) => {
//     return password.length >= 6;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!isValidEmail(formData.email)) {
//       setError('Please enter a valid email address.');
//       return;
//     }

//     if (!isValidPhone(formData.phone)) {
//       setError('Please enter a 10-digit phone number.');
//       return;
//     }

//     if (!isValidPassword(formData.password)) {
//       setError('Password must be at least 6 characters long.');
//       return;
//     }

//     try {
//       const userPayload = {
//         username: formData.name,
//         email: formData.email,
//         phone: formData.phone,
//         password: formData.password,
//       };

//       // Try logging in first
//       let user = await loginUser({ username: userPayload.username, password: userPayload.password });

//       // If login fails, fallback to create user
//       if (!user || user.error) {
//         user = await createUser(userPayload);
//       }

//       // Save user ID in local storage or context (here we use localStorage for demo)
//       localStorage.setItem('user_id', user.user_id);

//       navigate('/questionnaire/start');
//     } catch (err) {
//       console.error('Login error:', err);
//       setError('Unable to login or create user.');
//     }
//   };

//   return (
//     <div
//       className="login-page"
//       style={{ backgroundImage: `url(${introBackground})` }}
//     >
//       <div className="login-card">
//         <img src={logo} alt="Urban Grower Logo" className="logo-img" />
//         <h1 className="login-title">Welcome to Urban Grower</h1>
//         <p className="login-subtitle">Create an account or sign in below.</p>

//         {!showSignup ? (
//           <button onClick={() => setShowSignup(true)} className="login-button">
//             Sign In / Sign Up
//           </button>
//         ) : (
//           <form className="login-form" onSubmit={handleSubmit}>
//             <input
//               type="text"
//               name="name"
//               placeholder="Username"
//               onChange={handleChange}
//               required
//             />
//             <input
//               type="email"
//               name="email"
//               placeholder="Email"
//               onChange={handleChange}
//               required
//             />
//             <input
//               type="tel"
//               name="phone"
//               placeholder="Phone Number"
//               onChange={handleChange}
//               required
//             />
//             <input
//               type="password"
//               name="password"
//               placeholder="Password"
//               onChange={handleChange}
//               required
//             />
//             {error && <p className="login-error">{error}</p>}
//             <button type="submit" className="login-button">
//               Continue
//             </button>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// };

// export default LoginPage;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/catnip_logo.png';
import introBackground from '../assets/intro_page_bg.PNG';
import '../styling/Login.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const [showSignup, setShowSignup] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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