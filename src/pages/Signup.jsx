import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';
import './Signup.css'; // Make sure the path is correct

const SignUp = () => {
    const [name, setName] = useState(''); // <-- Added state for name
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [location, setLocation] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            if (!file.type.startsWith('image/')) {
                setError('Please select a valid image file (e.g., JPG, PNG, GIF).');
                setImageFile(null);
                setImagePreview('');
                e.target.value = null;
                return;
            }
            if (error.includes('image')) setError('');
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setImageFile(null);
            setImagePreview('');
        }
    };

    const handleSignUp = (e) => {
        e.preventDefault();

        // Validation - Now include name
        if (!name || !email || !password || !location) { // <-- Added name check
            setError('Please enter name, email, password, and location.'); // <-- Updated error message
            return;
        }

        if (!error.includes('image')) setError('');

        // --- Simulate successful signup ---

        // Store user details in localStorage
        localStorage.setItem('userName', name); // <-- Store name
        localStorage.setItem('userEmail', email);
        // WARNING: Storing passwords directly in localStorage is insecure.
        localStorage.setItem('userPassword', password);
        localStorage.setItem('userLocation', location);

        // Store image preview (if selected)
        if (imagePreview) {
            localStorage.setItem('userImagePreview', imagePreview);
        } else {
            localStorage.removeItem('userImagePreview');
        }

        // Generate and store joined date
        const joinedDate = new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
        localStorage.setItem('userJoinedDate', joinedDate);

        // Optionally, store an auth token
        localStorage.setItem('authToken', 'sampleToken');

        console.log("Signup successful! Data stored:");
        console.log("Name:", name);
        console.log("Email:", email);
        console.log("Location:", location);
        console.log("Joined:", joinedDate);
        console.log("Image Preview Stored:", !!imagePreview);
        console.log("Image File (for server):", imageFile);

        navigate('/profile');
    };

    return (
        <div className="signup-container">
            <div className="signup-card">
                <h2 className="signup-title">Sign Up</h2>
                <Form onSubmit={handleSignUp} className="signup-form">
                    {error && <Alert variant="danger" className="custom-alert">{error}</Alert>}

                    {/* Name Field - Added */}
                    <Form.Group controlId="formName" className="form-group-custom">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter your full name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </Form.Group>

                    {/* Email Field */}
                    <Form.Group controlId="formEmail" className="form-group-custom">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </Form.Group>

                    {/* Password Field */}
                    <Form.Group controlId="formPassword" className="form-group-custom">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </Form.Group>

                    {/* Location Field */}
                    <Form.Group controlId="formLocation" className="form-group-custom">
                        <Form.Label>Location</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="e.g., New York, USA"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            required
                        />
                    </Form.Group>

                    {/* Image Upload Field */}
                    <Form.Group controlId="formImage" className="form-group-custom">
                        <Form.Label>Profile Picture (Optional)</Form.Label>
                        <Form.Control
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="form-control-file-custom"
                        />
                    </Form.Group>

                    {/* Image Preview */}
                    {imagePreview && (
                        <div className="image-preview-container">
                            <img src={imagePreview} alt="Selected preview" className="image-preview" />
                        </div>
                    )}

                    {/* Submit Button */}
                    <Button variant="primary" type="submit" className="btn-signup">
                        Sign Up
                    </Button>
                </Form>
                <div className="extra-links">
                    {/* Links */}
                </div>
            </div>
        </div>
    );
};

export default SignUp;