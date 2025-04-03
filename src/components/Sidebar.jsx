import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBell, faFileInvoiceDollar, faListAlt } from '@fortawesome/free-solid-svg-icons'; // Import specific icons
import './Sidebar.css';

const Sidebar = () => {
  return (
    <Navbar bg="light" expand="lg" className="sidebar flex-column">
      <Navbar.Brand as={Link} to="/signin" className="sidebar-brand">
      <br></br>
        Baqer Ali 
        Assignment
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="flex-column">
          <Nav.Link as={Link} to="/profile">
            <FontAwesomeIcon icon={faUser} className="nav-icon" /> User Profile
          </Nav.Link>
          <Nav.Link as={Link} to="/notifications">
            <FontAwesomeIcon icon={faBell} className="nav-icon" /> Notifications
          </Nav.Link>
          <Nav.Link as={Link} to="/billing">
            <FontAwesomeIcon icon={faFileInvoiceDollar} className="nav-icon" /> Billing & Invoices
          </Nav.Link>
          <Nav.Link as={Link} to="/plans">
            <FontAwesomeIcon icon={faListAlt} className="nav-icon" /> Plans & Add-ons
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Sidebar;