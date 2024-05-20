import React, { useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import './login.css'; 

const Login = ({ onLogin }) => {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // useNavigate hook for navigation

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

  const handleForgotPasswordClick = () => {
    navigate('/forgot-password'); // Redirect to ForgotPassword component
  };

  return (
    <Container className="login-container">
      <Form onSubmit={handleLoginSubmit} className="login-form">
        <h2>Login</h2>
        <Form.Group controlId="formEmail">
          <Form.Control
            type="text"
            name="email"
            placeholder="Email or Name"
            value={loginData.email}
            onChange={handleLoginInputChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
            value={loginData.password}
            onChange={handleLoginInputChange}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="btn-login">
          Login
        </Button>
        <Button variant="link" onClick={handleForgotPasswordClick} className="forgot-password-link">
          Forgot Password?
        </Button>
        {errorMessage && <Alert variant="danger" className="error-message">{errorMessage}</Alert>}
      </Form>
      <div className="signup-link">
        <p>Don't have an account?</p>
        <Link to="/signup">Create an account</Link>
      </div>
    </Container>
  );
};

export default Login;