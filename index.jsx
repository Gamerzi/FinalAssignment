import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

const Sidebar = () => {
  return (
    <Navbar bg="light" expand="lg" className="flex-column">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="flex-column">
          
          <Nav.Link as={Link} to="/profile">User Profile</Nav.Link>
          <Nav.Link as={Link} to="/notifications">Notifications</Nav.Link>
          <Nav.Link as={Link} to="/billing">Billing & Invoices</Nav.Link>
          <Nav.Link as={Link} to="/plans">Plans & Add-ons</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Sidebar;