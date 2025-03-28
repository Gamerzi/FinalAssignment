import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import './Signup.css'; // Make sure the path is correct

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSignUp = (e) => {
    e.preventDefault();

    // Validation
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    // Clear any previous errors
    setError('');

    // Store the credentials in localStorage
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userPassword', password);

    // Optionally, store an auth token
    localStorage.setItem('authToken', 'sampleToken');

    navigate('/profile');
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2 className="signup-title">Sign Up</h2>
        <Form onSubmit={handleSignUp} className="signup-form">
          {error && <Alert variant="danger" className="custom-alert">{error}</Alert>}
          <Form.Group controlId="formEmail" className="form-group-custom">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formPassword" className="form-group-custom">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="btn-signup">
            Sign Up
          </Button>
        </Form>
        <div className="extra-links">
          {/* Add links here if needed */}
        </div>
      </div>
    </div>
  );
};

export default SignUp;