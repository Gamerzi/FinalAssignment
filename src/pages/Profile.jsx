import React, { useState, useRef, useEffect } from 'react';
import { Nav, Form, Button, Container, Row, Col, Image, Card } from 'react-bootstrap';
import './Profile.css';

const Profile = () => {
  const [profile, setProfile] = useState({ name: 'Jenny Wilson', joinDate: 'May 10, 2022', accountType: 'Premium', email: 'jenny.wil@example.com', location: 'New York, USA' });
  const [profileImage, setProfileImage] = useState('https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80');
  const fileInputRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editableProfile, setEditableProfile] = useState({ ...profile });

  useEffect(() => { setEditableProfile({ ...profile }); }, [profile]);
  const handleImageChange = (event) => { const file = event.target.files[0]; if (file && file.type.startsWith('image/')) { const reader = new FileReader(); reader.onloadend = () => { setProfileImage(reader.result); }; reader.readAsDataURL(file); } event.target.value = null; };
  const handleEditPictureClick = () => { fileInputRef.current.click(); };
  const handleEditToggle = () => { if (!isEditing) { setEditableProfile({ ...profile }); } setIsEditing(!isEditing); };
  const handleProfileChange = (event) => { const { name, value } = event.target; setEditableProfile(prev => ({ ...prev, [name]: value })); };
  const handleSave = () => { setProfile({ ...editableProfile }); setIsEditing(false); console.log("Profile Saved:", editableProfile); };
  const handleCancel = () => { setIsEditing(false); };
  const handleMakePaymentClick = () => { alert("Initiating payment process..."); };

  return (
    <div className="account-dashboard gradient-background-dark"> {/* Updated class */}
      <Container fluid className="main-container g-0">
         <Row className="g-0 justify-content-center">
           <Col xxl={10} xl={11} xs={12} className="content-area p-lg-4 p-3">
              {/* Header Section */}
              <Row className="mb-4 mb-lg-5 justify-content-center text-center">
                 <Col xs={12}>
                     <h2 className="mb-0 fw-bold content-title">User Profile</h2>
                 </Col>
             </Row>

             {/* Main content Row */}
             <Row>
               {/* Left Column: User Profile Card */}
               <Col lg={4} className="mb-4 mb-lg-0">
                 {!isEditing ? (
                    <Card className="user-profile-card display-mode interactive-card h-100">
                        <Card.Body className="text-center d-flex flex-column align-items-center p-4">
                            <div className="profile-picture-area mb-3">
                                <Image key={profileImage} src={profileImage} roundedCircle className="user-avatar mb-2" />
                                <Button variant="light" size="sm" className="edit-picture-btn-alt" onClick={handleEditPictureClick} title="Change picture"><i className="bi bi-pencil"></i></Button>
                                <input type="file" ref={fileInputRef} onChange={handleImageChange} style={{ display: 'none' }} accept="image/*" />
                            </div>
                            <h5 className="mt-2 mb-1 fw-bold">{profile.name}</h5>
                            <p className="text-muted small mb-3">{profile.accountType}</p>
                            <hr className="w-100 profile-hr" />
                            <div className="user-details-display text-start w-100 mt-2">
                                <Row className="detail-row"><Col xs={4} sm={3} md={4} className="detail-label">Email:</Col><Col xs={8} sm={9} md={8} className="detail-value">{profile.email}</Col></Row>
                                <Row className="detail-row"><Col xs={4} sm={3} md={4} className="detail-label">Location:</Col><Col xs={8} sm={9} md={8} className="detail-value">{profile.location}</Col></Row>
                                <Row className="detail-row"><Col xs={4} sm={3} md={4} className="detail-label">Joined:</Col><Col xs={8} sm={9} md={8} className="detail-value">{profile.joinDate}</Col></Row>
                            </div>
                            <Button variant="outline-primary" size="sm" className="mt-auto edit-profile-btn" onClick={handleEditToggle}><i className="bi bi-pencil-square me-1"></i> Edit Profile</Button>
                        </Card.Body>
                    </Card>
                 ) : (
                    <Card className="user-profile-card edit-mode interactive-card h-100">
                        <Card.Body className="text-center d-flex flex-column align-items-center p-4">
                             <div className="profile-picture-area mb-3">
                                <Image key={profileImage} src={profileImage} roundedCircle className="user-avatar mb-2" />
                                <Button variant="light" size="sm" className="edit-picture-btn-alt" onClick={handleEditPictureClick} title="Change picture"><i className="bi bi-pencil"></i></Button>
                                <input type="file" ref={fileInputRef} onChange={handleImageChange} style={{ display: 'none' }} accept="image/*" />
                            </div>
                            <Form className="w-100 mt-2 text-start edit-form">
                                <Form.Group className="mb-3" controlId="editName"><Form.Label className="edit-form-label">Name</Form.Label><Form.Control type="text" name="name" size="sm" value={editableProfile.name} onChange={handleProfileChange} className="edit-form-control" /></Form.Group>
                                <Form.Group className="mb-3" controlId="editEmail"><Form.Label className="edit-form-label">Email</Form.Label><Form.Control type="email" name="email" size="sm" value={editableProfile.email} onChange={handleProfileChange} className="edit-form-control" /></Form.Group>
                                <Form.Group className="mb-3" controlId="editLocation"><Form.Label className="edit-form-label">Location</Form.Label><Form.Control type="text" name="location" size="sm" value={editableProfile.location} onChange={handleProfileChange} className="edit-form-control" /></Form.Group>
                                <Form.Group className="mb-3" controlId="editAccountType"><Form.Label className="edit-form-label">Account Type</Form.Label><Form.Control type="text" name="accountType" size="sm" value={editableProfile.accountType} onChange={handleProfileChange} className="edit-form-control" /></Form.Group>
                            </Form>
                            <div className="edit-form-buttons w-100 mt-auto pt-3">
                                <Row className="g-2"><Col xs={6}><Button variant="secondary" className="w-100 cancel-btn" onClick={handleCancel}>Cancel</Button></Col><Col xs={6}><Button variant="success" className="w-100 save-btn" onClick={handleSave}><i className="bi bi-check-lg me-1"></i> Save Changes</Button></Col></Row>
                            </div>
                        </Card.Body>
                    </Card>
                 )}
               </Col>

               {/* Right Column: Stats & Transactions */}
               <Col lg={8}>
                   <Row className="mb-4">
                        <Col md={6} className="mb-3 mb-md-0">
                            <Card className="stats-card interactive-card shadow-sm h-100">
                                <Card.Body className="d-flex flex-column">
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <h6 className="mb-0 fw-bold card-title-small">Transaction Summary</h6>
                                        <Form.Select size="sm" className="w-auto filter-dropdown" defaultValue="This Week"><option>This Week</option><option>This Month</option><option>This Year</option></Form.Select>
                                    </div>
                                    <div className="d-flex align-items-center mt-auto">
                                        <div className="me-3 flex-shrink-0"><div className="chart-placeholder summary-chart"><i className="bi bi-receipt fs-4 text-primary"></i></div></div>
                                        <div className="stats-details small">
                                            <div><span className="status-dot bg-success"></span> Successful: 32</div>
                                            <div><span className="status-dot bg-warning"></span> Pending: 5</div>
                                            <div><span className="status-dot bg-danger"></span> Failed: 2</div>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={6}>
                            <Card className="stats-card interactive-card shadow-sm h-100">
                                <Card.Body className="d-flex flex-column">
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <h6 className="mb-0 fw-bold card-title-small">Active Plans & Add-ons</h6>
                                        <Form.Select size="sm" className="w-auto filter-dropdown" defaultValue="Expiring Soon"><option>All Active</option><option>Expiring Soon</option></Form.Select>
                                    </div>
                                    <div className="d-flex align-items-center mt-auto">
                                        <div className="me-3 flex-shrink-0"><div className="chart-placeholder plan-chart"><i className="bi bi-collection fs-4 text-success"></i></div></div>
                                        <div className="stats-details small">
                                            <div><strong>Current Plan:</strong> {profile.accountType}</div>
                                            <div><strong>Add-ons:</strong> Extra Storage, Priority Support</div>
                                            <div className="text-muted mt-1">Renews: Dec 31, 2024</div>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                   </Row>

                   <Card className="shadow-sm transactions-card interactive-card">
                       <Card.Header className="bg-white border-0 p-3">
                           <Nav variant="tabs" defaultActiveKey="#transactions" className="subtle-tabs">
                               <Nav.Item><Nav.Link href="#transactions">Transactions</Nav.Link></Nav.Item>
                               <Nav.Item><Nav.Link href="#invoices">Invoices</Nav.Link></Nav.Item>
                               <Nav.Item><Nav.Link href="#methods">Payment Methods</Nav.Link></Nav.Item>
                               <Nav.Item className="ms-auto d-flex align-items-center">
                                   <Button variant="link" size="sm" className="text-muted more-options-btn"><i className="bi bi-three-dots"></i></Button>
                               </Nav.Item>
                           </Nav>
                       </Card.Header>
                       <Card.Body className="p-0">
                           <div className="d-flex justify-content-between align-items-center p-3 border-bottom filter-action-row">
                               <Form.Select size="sm" className="w-auto filter-dropdown" defaultValue="Completed">
                                   <option>Recent Transactions</option><option>Completed</option><option>Pending</option><option>Failed</option>
                               </Form.Select>
                               <Button variant="primary" size="sm" className="new-action-btn" onClick={handleMakePaymentClick}>
                                   <i className="bi bi-plus-lg me-1"></i> Make Payment
                               </Button>
                           </div>
                           <div className="list-group list-group-flush transactions-list">
                               <div className="list-group-item list-group-item-action d-flex align-items-center">
                                   <div className="transaction-date"><small>25.08.2024</small></div>
                                   <div className="transaction-description text-truncate"><small>Monthly Subscription - Premium</small></div>
                                   <div className="transaction-amount text-end"><small>$29.99</small></div>
                                   <div className="transaction-status status-completed"><small>Completed</small></div>
                                   {/* Button is hidden on mobile via CSS */}
                                   <Button variant="link" size="sm" className="p-0 text-muted item-options-btn ms-auto"><i className="bi bi-three-dots-vertical"></i></Button>
                               </div>
                               <div className="list-group-item list-group-item-action d-flex align-items-center">
                                   <div className="transaction-date"><small>15.08.2024</small></div>
                                   <div className="transaction-description text-truncate"><small>Add-on: Extra Storage</small></div>
                                   <div className="transaction-amount text-end"><small>$5.00</small></div>
                                   <div className="transaction-status status-completed"><small>Completed</small></div>
                                   {/* Button is hidden on mobile via CSS */}
                                   <Button variant="link" size="sm" className="p-0 text-muted item-options-btn ms-auto"><i className="bi bi-three-dots-vertical"></i></Button>
                               </div>
                               <div className="list-group-item list-group-item-action d-flex align-items-center">
                                   <div className="transaction-date"><small>Pending</small></div>
                                   <div className="transaction-description text-truncate"><small>Invoice #INV-123 Payment</small></div>
                                   <div className="transaction-amount text-end"><small>$150.50</small></div>
                                   <div className="transaction-status status-pending"><small>Pending</small></div>
                                   {/* Button is hidden on mobile via CSS */}
                                   <Button variant="link" size="sm" className="p-0 text-muted item-options-btn ms-auto"><i className="bi bi-three-dots-vertical"></i></Button>
                               </div>
                           </div>
                       </Card.Body>
                   </Card>
               </Col>
             </Row>
           </Col>
         </Row>
       </Container>
     </div>
  );
};

export default Profile;