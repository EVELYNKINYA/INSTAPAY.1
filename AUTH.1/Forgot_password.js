import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Container, Form, Button } from 'react-bootstrap';
import './forgotpassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [validationMessage, setValidationMessage] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setTimeout(async () => {
      setLoading(false);
      if (email) {
        if (email !== (process.env.REACT_APP_LOGIN || 'paydunya@gmail.com')) {
          toast('error', 'Failed to reload account');
          setValidationMessage(['The email does not match a user']);
        } else {
          try {
            const response = await fetch('/api/reset-password', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ email }),
            });
            const data = await response.json();
            if (response.ok) {
              toast('success', 'An email has been sent to you to reset your password.');
              setMessage(data.message);
              setEmail('');
              setValidationMessage([]);
            } else {
              setMessage(data.message || 'An error occurred. Please try again later.');
              toast('error', data.message || 'An error occurred. Please try again later.');
            }
          } catch (error) {
            setMessage('An error occurred. Please try again later.');
            toast('error', 'An error occurred. Please try again later.');
          }
        }
      } else {
        toast('error', 'Failed to reload account');
        setValidationMessage(['This field is required']);
      }
    }, 3000);
  };

  return (
    <Container className="forgot-password-container">
      <h2>Reset Password</h2>
      <p>Forgot your password? Worry less! We'll email you instructions to reset your password.</p>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Email *</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? 'Sending...' : 'Send Reset Link'}
        </Button>
      </Form>
      {message && <p>{message}</p>}
      {validationMessage.length > 0 && <p>{validationMessage[0]}</p>}
      <Button variant="link" onClick={() => window.location.href = '/login'}>
        Back to Login
      </Button>
    </Container>
  );
};

export default ForgotPassword;