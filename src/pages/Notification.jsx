import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import './Notification.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faEnvelope, faComment } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

library.add(faBell, faEnvelope, faComment);

const Notifications = () => {
    const [preferences, setPreferences] = useState({
        push: false,
        email: false,
        sms: false,
    });

    const handleToggle = (preference) => {
        setPreferences({
            ...preferences,
            [preference]: !preferences[preference],
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Simulate API call (replace with your actual API endpoint)
            await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate delay

            // Display a success message or update the UI as needed
            alert('Notification preferences updated successfully!');
            console.log('Notification preferences updated:', preferences);
        } catch (error) {
            // Handle errors (e.g., display an error message to the user)
            console.error('Error updating notification preferences:', error);
            alert('An error occurred while updating preferences.');
        }
    };

    return (
        <Container className="notifications-container">
            <Row className="justify-content-md-center">
                <Col md={8}>
                    <h2 className="notification-title">Notification Preferences</h2>
                    <Form onSubmit={handleSubmit}>
                        <NotificationItem
                            label="Push Notifications"
                            description="Receive notifications about account activity and updates"
                            icon={faBell}
                            value="push"
                            checked={preferences.push}
                            onChange={handleToggle}
                        />
                        <NotificationItem
                            label="Email Notifications"
                            description="Get important updates and summaries via email"
                            icon={faEnvelope}
                            value="email"
                            checked={preferences.email}
                            onChange={handleToggle}
                        />
                        <NotificationItem
                            label="SMS Notifications"
                            description="Receive text messages for critical alerts"
                            icon={faComment}
                            value="sms"
                            checked={preferences.sms}
                            onChange={handleToggle}
                        />
                        <div className="d-grid gap-2">
                            <Button variant="primary" type="submit">
                                Save Preferences
                            </Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

const NotificationItem = ({ label, description, icon, value, checked, onChange }) => {
    return (
        <div className="notification-item">
            <div className="notification-content">
                <FontAwesomeIcon icon={icon} className="notification-icon" />
                <div>
                    <div className="notification-label">{label}</div>
                    <div className="notification-description">{description}</div>
                </div>
            </div>
            <Form.Check
                type="checkbox"
                id={`notification-checkbox-${value}`}
                checked={checked}
                onChange={() => onChange(value)}
                label=""
                className="notification-checkbox" // Consistent class name for checkbox
            />
        </div>
    );
};

export default Notifications;