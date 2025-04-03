import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from './components/Sidebar';
import Profile from './pages/Profile';
import Notifications from './pages/Notification';
import Billing from './pages/Billing';
import Plans from './pages/Plans';
import SignUp from './pages/Signup';
import SignIn from './pages/Signin';
import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/" element={<Navigate to="/signin" />} /> {/* First goes to /signup */}
        <Route
          path="*"
          element={
            <Container fluid>
              <Row>
                <Col md={3}>
                  <Sidebar />
                </Col>
                <Col md={9}>
                  <Routes>
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/notifications" element={<Notifications />} />
                    <Route path="/billing" element={<Billing />} />
                    <Route path="/plans" element={<Plans />} />
                    <Route path="*" element={<Navigate to="/profile" />} />
                  </Routes>
                </Col>
              </Row>
            </Container>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;