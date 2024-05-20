import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import './signup.css'; // Import your custom CSS for additional styling

const Signup = ({ onSignup }) => {
  const [signupData, setSignupData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '', // New field for confirm password
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignupInputChange = (e) => {
    const { name, value } = e.target;
    setSignupData({ ...signupData, [name]: value });
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    if (
      !signupData.email ||
      !signupData.firstName ||
      !signupData.lastName ||
      !signupData.password ||
      !signupData.confirmPassword
    ) {
      setErrorMessage('Please enter all required information');
      return;
    }

    if (!isValidEmail(signupData.email)) {
      setErrorMessage('Please enter a valid email address');
      return;
    }

    if (signupData.password !== signupData.confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupData),
      });

      if (response.ok) {
        console.log('Signup successful');
        setErrorMessage('');
        onSignup(); // Call the onSignup prop function passed from the parent component
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message);
      }
    } catch (error) {
      console.error('Error during signup:', error);
      setErrorMessage('An error occurred during signup.');
    }
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <Container className="signup-container">
      <Form onSubmit={handleSignupSubmit} className="signup-form">
        <h2>Sign Up</h2>
        <Form.Group controlId="formEmail">
          <Form.Control
            type="email"
            name="email"
            placeholder="Email"
            value={signupData.email}
            onChange={handleSignupInputChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formFirstName">
          <Form.Control
            type="text"
            name="firstName"
            placeholder="First Name"
            value={signupData.firstName}
            onChange={handleSignupInputChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formLastName">
          <Form.Control
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={signupData.lastName}
            onChange={handleSignupInputChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
            value={signupData.password}
            onChange={handleSignupInputChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formConfirmPassword">
          <Form.Control
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={signupData.confirmPassword}
            onChange={handleSignupInputChange}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="btn-signup">
          Sign Up
        </Button>
        {errorMessage && <Alert variant="danger" className="error-message">{errorMessage}</Alert>}
      </Form>
      <div className="login-link">
        <p>Already have an account?</p>
        <Link to="/login">Login</Link>
      </div>
    </Container>
  );
};

export default Signup;