import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';
import './Signin.css';

const SignIn = () => {
  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();
    // No authentication check anymore
    localStorage.setItem('authToken', 'sampleToken');  // Set a default token (optional)
    navigate('/profile'); // Always navigate to /profile
  };

  return (
    <div className="signin-container">
      <div className="signin-card">
        <h1 className="signin-title">Login</h1>
        
        <Form onSubmit={handleSignIn} className="signin-form">
          <Form.Group controlId="formEmail" className="form-group-custom">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              required
            />
          </Form.Group>

          <Form.Group controlId="formPassword" className="form-group-custom">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password"
              required
            />
          </Form.Group>

          <Button type="submit" className="btn-login">
            Login
          </Button>
        </Form>

        <div className="extra-links">
          <a>Forgot Password?</a>
          <p>
            Don't have an account? <a href="/signup">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;