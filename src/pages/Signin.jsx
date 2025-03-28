import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';
import './Signin.css';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();
    setError('');

    const storedEmail = localStorage.getItem('userEmail');
    const storedPassword = localStorage.getItem('userPassword');

    if (email === storedEmail && password === storedPassword) {
      localStorage.setItem('authToken', 'sampleToken');
      navigate('/profile');
    } else {
      setError('Invalid email or password.');
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-card">
        <h1 className="signin-title">Login</h1>
        
        {error && (
          <Alert variant="danger" className="custom-alert text-center">
            {error}
          </Alert>
        )}

        <Form onSubmit={handleSignIn} className="signin-form">
          <Form.Group controlId="formEmail" className="form-group-custom">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formPassword" className="form-group-custom">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
            Don&apos;t have an account? <a href="">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
