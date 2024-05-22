import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');

  const handleLoginInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        console.log('Login successful');
        setErrorMessage('');
        onLogin(); // Call the onLogin prop function passed from the parent component
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message);
      }
    } catch (error) {
      console.error('Error during login:', error);
      setErrorMessage('An error occurred during login.');
    }
  };

  return (
    <div>
      <form onSubmit={handleLoginSubmit}>
        <h2>Login</h2>
        <input
          type="text"
          name="email"
          placeholder="Email or Name"
          value={loginData.email}
          onChange={handleLoginInputChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={loginData.password}
          onChange={handleLoginInputChange}
          required
        />
        <button type="submit">Login</button>
        {errorMessage && <div className="error">{errorMessage}</div>}
      </form>
      <div>
        <p>Don't have an account?</p>
        <Link to="/signup">Create an account</Link>
      </div>
    </div>
  );
};

export default Login;