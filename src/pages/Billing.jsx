import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Button, Modal, Form, Image } from 'react-bootstrap';
import './Billing.css'; // Make sure Billing.css exists and contains the CSS provided earlier
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faCreditCard, faEnvelope, faSort, faTrash, faPlus, faEdit } from '@fortawesome/free-solid-svg-icons';

// --- Initial Data ---
const initialSubscriptionData = {
    planName: 'Growth Plan',
    billingCycle: 'Monthly',
    planCost: '$5698',
    usage: 4850, // Example data, not directly editable in this version
    totalUsers: 5000, // Example data, not directly editable in this version
    availablePlans: [
        { name: 'Basic Plan', cost: '$1200' },
        { name: 'Pro Plan', cost: '$7000' },
        { name: 'Growth Plan', cost: '$5698' }
    ]
};

const initialPaymentData = {
    cardType: 'Master Card',
    cardNumber: '**** **** **** 4002',
    expiryMonth: '12',
    expiryYear: '2024',
    email: 'billing@acme.corp',
    cardImage: null, // Will hold blob URL or persistent URL
};

const initialInvoicesData = [
    { id: '#23456', date: '2023-01-23', plan: 'Basic Plan', amount: '$1200', status: 'Paid' }, // Use YYYY-MM-DD for date inputs
    { id: '#56489', date: '2023-02-23', plan: 'Pro Plan', amount: '$7000', status: 'Paid' },
    { id: '#56489-1', date: '2023-03-23', plan: 'Pro Plan', amount: '$7000', status: 'Paid' },
    { id: '#98380', date: '2023-04-23', plan: 'Growth Plan', amount: '$5698', status: 'Paid' },
    { id: '#90394', date: '2023-05-23', plan: 'Basic Plan', amount: '$1200', status: 'Paid' },
    { id: '#929348', date: '2023-06-23', plan: 'Growth Plan', amount: '$1200', status: 'Paid' },
];
// --- End Initial Data ---

const Billing = () => {
    // --- State Variables ---
    const [subscription, setSubscription] = useState(initialSubscriptionData);
    const [paymentMethod, setPaymentMethod] = useState(initialPaymentData);
    const [invoices, setInvoices] = useState(initialInvoicesData);

    // Modal Visibility States
    const [showPlanModal, setShowPlanModal] = useState(false);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [showAddInvoiceModal, setShowAddInvoiceModal] = useState(false); // Renamed for clarity
    const [showEditInvoiceModal, setShowEditInvoiceModal] = useState(false);

    // State for Plan Modal
    const [selectedPlan, setSelectedPlan] = useState(subscription.planName);
    const [customPlanName, setCustomPlanName] = useState('');
    const [customPlanCost, setCustomPlanCost] = useState('');

    // State for Payment Modal
    const [tempPaymentDetails, setTempPaymentDetails] = useState({ ...initialPaymentData });
    const [cardImageFile, setCardImageFile] = useState(null);
    const [cardImagePreview, setCardImagePreview] = useState(null);

    // State for Add Invoice Modal
    const [newInvoice, setNewInvoice] = useState({ id: '', date: '', plan: '', amount: '', status: 'Paid' });

    // State for Editing Invoices
    const [editingInvoice, setEditingInvoice] = useState(null); // Holds the original invoice object being edited
    const [currentEditingInvoiceData, setCurrentEditingInvoiceData] = useState(null); // Temp state for edit form data

    // --- Effects ---

    // Cleanup for card image preview URL
    useEffect(() => {
        return () => {
            if (cardImagePreview && cardImagePreview.startsWith('blob:')) {
                URL.revokeObjectURL(cardImagePreview);
            }
        };
    }, [cardImagePreview]);

    // Effect for Payment Modal state reset/cleanup
    useEffect(() => {
        if (showPaymentModal) {
            setTempPaymentDetails({ ...paymentMethod }); // Reset form with current data on open
            setCardImagePreview(paymentMethod.cardImage);
            setCardImageFile(null);
        } else {
            // Clean up preview URL only if it's a blob and hasn't been saved
            if (cardImagePreview && cardImagePreview !== paymentMethod.cardImage && cardImagePreview.startsWith('blob:')) {
                URL.revokeObjectURL(cardImagePreview);
                setCardImagePreview(null); // Also clear preview state
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showPaymentModal]); // Depends only on showPaymentModal

     // Effect for Plan Modal state reset
     useEffect(() => {
        if (showPlanModal) {
            setSelectedPlan(subscription.planName); // Reset dropdown
            setCustomPlanName(''); // Clear custom fields
            setCustomPlanCost('');
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showPlanModal]); // Depends only on showPlanModal


    // --- Event Handlers ---

    // Handler for direct input changes in the subscription summary
    const handleSubscriptionInputChange = (e) => {
        const { name, value } = e.target;
        setSubscription(prev => ({ ...prev, [name]: value }));
    };

    // --- Plan Modal Handlers ---
    const handleShowPlanModal = () => setShowPlanModal(true);
    const handleClosePlanModal = () => setShowPlanModal(false);
    const handlePlanSelectChange = (e) => { setSelectedPlan(e.target.value); };
    const handleCustomPlanNameChange = (e) => setCustomPlanName(e.target.value);
    const handleCustomPlanCostChange = (e) => setCustomPlanCost(e.target.value);
    const handleApplyPlanChanges = () => {
        const trimmedCustomName = customPlanName.trim();
        const trimmedCustomCost = customPlanCost.trim();
        if (trimmedCustomName && trimmedCustomCost) {
            setSubscription(prev => ({ ...prev, planName: trimmedCustomName, planCost: trimmedCustomCost, /* billingCycle: 'Custom' ? */ }));
        } else if (trimmedCustomName && !trimmedCustomCost) {
             alert("Please enter both a name and a cost for the custom plan.");
             return;
        } else {
            const chosenPlan = subscription.availablePlans.find(p => p.name === selectedPlan);
            if (chosenPlan) {
                 setSubscription(prev => ({ ...prev, planName: chosenPlan.name, planCost: chosenPlan.cost, /* update billingCycle if needed */ }));
            }
        }
        handleClosePlanModal();
    };
    // --- End Plan Modal Handlers ---


    // --- Payment Modal Handlers ---
    const handleShowPaymentModal = () => setShowPaymentModal(true);
    const handleClosePaymentModal = () => setShowPaymentModal(false); // Cleanup handled by useEffect

    const handlePaymentInputChange = (e) => {
        const { name, value } = e.target;
        setTempPaymentDetails(prev => ({ ...prev, [name]: value }));
    };

    const handleCardImageChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            if (cardImagePreview && cardImagePreview !== paymentMethod.cardImage && cardImagePreview.startsWith('blob:')) {
                URL.revokeObjectURL(cardImagePreview);
            }
            const previewUrl = URL.createObjectURL(file);
            setCardImagePreview(previewUrl);
            setCardImageFile(file);
        } else {
             if (cardImagePreview && cardImagePreview !== paymentMethod.cardImage && cardImagePreview.startsWith('blob:')) {
                 URL.revokeObjectURL(cardImagePreview);
             }
             setCardImagePreview(paymentMethod.cardImage);
             setCardImageFile(null);
             e.target.value = null;
             if (file) alert("Please select a valid image file.");
        }
    };

    const handleSavePayment = () => {
        if (!tempPaymentDetails.cardType || !tempPaymentDetails.cardNumber || !tempPaymentDetails.expiryMonth || !tempPaymentDetails.expiryYear || !tempPaymentDetails.email) {
            alert("Please fill in all required card details.");
            return;
        }
        let imageToSave = paymentMethod.cardImage; // Default to existing
        if (cardImageFile) {
            // NOTE: In production, upload cardImageFile here & save the returned URL
            imageToSave = cardImagePreview; // Save temporary blob URL for demo
        }
        // If no new file, keep the original image unless explicitly removed (add remove button for that)
        setPaymentMethod({ ...tempPaymentDetails, cardImage: imageToSave });
        setCardImageFile(null); // Reset file state
        handleClosePaymentModal();
    };
    // --- End Payment Modal Handlers ---


    // --- Add Invoice Modal Handlers ---
    const handleShowAddInvoiceModal = () => {
        let newId;
        do { newId = `#${Math.floor(10000 + Math.random() * 90000)}`; }
        while (invoices.some(invoice => invoice.id === newId));
        const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD
        setNewInvoice({ id: newId, date: today, plan: '', amount: '', status: 'Pending' }); // Default to Pending, today's date
        setShowAddInvoiceModal(true);
    };
    const handleCloseAddInvoiceModal = () => setShowAddInvoiceModal(false);
    const handleNewInvoiceChange = (e) => {
        const { name, value } = e.target;
        setNewInvoice(prev => ({ ...prev, [name]: value }));
    };
    const handleAddInvoice = (e) => {
         e.preventDefault();
         if (!newInvoice.date || !newInvoice.plan || !newInvoice.amount) {
            alert("Please fill in Date, Plan, and Amount for the new invoice.");
            return;
        }
        setInvoices(prevInvoices => [...prevInvoices, newInvoice]);
        handleCloseAddInvoiceModal();
    };
    // --- End Add Invoice Modal Handlers ---


    // --- Edit Invoice Handlers ---
    const handleShowEditInvoiceModal = (invoiceToEdit) => {
        setEditingInvoice(invoiceToEdit); // Store the original invoice ref
        setCurrentEditingInvoiceData({ ...invoiceToEdit }); // Set form data to a copy
        setShowEditInvoiceModal(true);
    };
    const handleCloseEditInvoiceModal = () => {
        setShowEditInvoiceModal(false);
        setEditingInvoice(null);
        setCurrentEditingInvoiceData(null);
    };
    const handleEditInvoiceChange = (e) => {
        const { name, value } = e.target;
        setCurrentEditingInvoiceData(prev => ({ ...prev, [name]: value }));
    };
    const handleUpdateInvoice = (e) => {
        e.preventDefault();
        if (!currentEditingInvoiceData || !editingInvoice) return;
        if (!currentEditingInvoiceData.date || !currentEditingInvoiceData.plan || !currentEditingInvoiceData.amount) {
           alert("Please ensure Date, Plan, and Amount are filled in.");
           return;
       }
        const updatedInvoices = invoices.map(inv =>
            inv.id === editingInvoice.id ? currentEditingInvoiceData : inv // Replace the edited invoice
        );
        setInvoices(updatedInvoices);
        handleCloseEditInvoiceModal();
    };
    // --- End Edit Invoice Handlers ---


    // --- Delete Invoice Handler ---
    const handleDeleteInvoice = (idToDelete) => {
        if (window.confirm(`Are you sure you want to delete invoice ${idToDelete}?`)) {
           setInvoices(prevInvoices => prevInvoices.filter(invoice => invoice.id !== idToDelete));
        }
    };
    // --- End Delete Invoice Handler ---


    // --- Helper to format date for display (Optional) ---
    const formatDateForDisplay = (dateString) => {
        if (!dateString) return '';
        try {
            const date = new Date(dateString);
             // Adjust for potential timezone issues if needed, here assuming local interpretation is fine
             // const utcDate = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
            return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }); // e.g., 23 Jan 2023
        } catch (error) {
            console.error("Error formatting date:", error);
            return dateString; // Fallback to original string
        }
    };


    return (
        <Container className="billing-container">
            {/* Title and Description */}
            <h2>Billing</h2>
            <p className="billing-description">Effortlessly handle your billing and invoices right here.</p>

            <Row>
                {/* --- Current Plan Summary (Editable Fields) --- */}
                <Col md={6} className="mb-3 mb-md-0">
                    <div className="billing-section plan-summary">
                        <div className="section-header">
                            <h4>Current Plan Summary</h4>
                             <Button
                                variant="primary"
                                className="change-button gradient button_adjust"
                                onClick={handleShowPlanModal}
                                size="sm"
                                style={{ float: 'right' }}
                             >
                                Choose/Edit Plan
                             </Button>
                        </div>
                        <Form>
                            <div className="plan-details">
                                <div className="plan-detail">
                                    <Form.Label className="detail-label">Plan Name</Form.Label>
                                    <Form.Control type="text" name="planName" className="detail-value-input" value={subscription.planName} onChange={handleSubscriptionInputChange} plaintext />
                                </div>
                                <div className="plan-detail">
                                     <Form.Label className="detail-label">Billing Cycle</Form.Label>
                                     <Form.Control type="text" name="billingCycle" className="detail-value-input" value={subscription.billingCycle} onChange={handleSubscriptionInputChange} plaintext />
                                </div>
                                <div className="plan-detail">
                                     <Form.Label className="detail-label">Plan Cost</Form.Label>
                                     <Form.Control type="text" name="planCost" className="detail-value-input" value={subscription.planCost} onChange={handleSubscriptionInputChange} plaintext />
                                </div>
                            </div>
                        </Form>
                    </div>
                </Col>

                {/* --- Payment Method --- */}
                <Col md={6}>
                    <div className="billing-section payment-method new-card">
                        <div className="payment-details">
                            <p className="card-type">{paymentMethod.cardType || 'Card Details'}</p>
                            <div className="payment-logo">
                                {paymentMethod.cardImage ? (
                                    <Image src={paymentMethod.cardImage} alt="Card" fluid style={{ maxHeight: '60px', marginBottom: '10px', borderRadius:'3px' }} />
                                ) : (
                                    <FontAwesomeIcon icon={faCreditCard} size="4x" color="#dc3545" />
                                )}
                            </div>
                            <div className="payment-info">
                                <p className="card-number">{paymentMethod.cardNumber}</p>
                                <p className="expiry-date">
                                    {paymentMethod.expiryMonth && paymentMethod.expiryYear ? `Expiry on ${paymentMethod.expiryMonth}/${paymentMethod.expiryYear}` : 'Expiry not set'}
                                </p>
                                <p className="billing-email"><FontAwesomeIcon icon={faEnvelope} /> {paymentMethod.email || 'Email not set'}</p>
                                <Button
                                    variant="outline-secondary"
                                    className="change-button gradient button_adjust"
                                    onClick={handleShowPaymentModal} // Linked to Payment modal
                                >
                                    Change
                                </Button>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>

             {/* --- Invoice Section --- */}
              <div className="billing-section invoice-section">
                <div className="invoice-header">
                    <h4>Invoice</h4>
                    <Button variant="success" onClick={handleShowAddInvoiceModal}> {/* Linked to Add Invoice modal */}
                       <FontAwesomeIcon icon={faPlus} /> Add Invoice
                    </Button>
                </div>
                <div className="table-responsive">
                    <Table striped bordered hover responsive className="invoice-table">
                        <thead>
                            <tr>
                                <th>Invoice ID <FontAwesomeIcon icon={faSort} /></th>
                                <th>Billing Date <FontAwesomeIcon icon={faSort} /></th>
                                <th>Plan <FontAwesomeIcon icon={faSort} /></th>
                                <th>Amount <FontAwesomeIcon icon={faSort} /></th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                             {invoices.length > 0 ? (
                                invoices.map((invoice) => (
                                <tr key={invoice.id}>
                                    <td>{invoice.id}</td>
                                    <td>{formatDateForDisplay(invoice.date)}</td> {/* Use formatter */}
                                    <td>{invoice.plan}</td>
                                    <td>{invoice.amount}</td>
                                    <td>
                                        {invoice.status === 'Paid' ? ( <span className="status-paid"><FontAwesomeIcon icon={faCheckCircle} /> Paid</span> )
                                         : ( <span className={`status-${invoice.status?.toLowerCase().replace(' ','-') || 'unknown'}`}>{invoice.status}</span> )} {/* Handle spaces in status */}
                                    </td>
                                    <td className='text-center'>
                                        <Button variant="info" size="sm" className="me-1" onClick={() => handleShowEditInvoiceModal(invoice)} title={`Edit Invoice ${invoice.id}`}> {/* Linked to Edit handler */}
                                            <FontAwesomeIcon icon={faEdit} />
                                        </Button>
                                        <Button variant="danger" size="sm" onClick={() => handleDeleteInvoice(invoice.id)} title={`Delete Invoice ${invoice.id}`}> {/* Linked to Delete handler */}
                                            <FontAwesomeIcon icon={faTrash} />
                                        </Button>
                                    </td>
                                </tr>
                            ))
                            ) : (
                                <tr> <td colSpan="6" className="text-center">No invoices found. Add one using the button above.</td> </tr>
                            )}
                        </tbody>
                    </Table>
                 </div>
            </div>

            {/* --- Modals --- */}

            {/* Plan Update Modal */}
            <Modal show={showPlanModal} onHide={handleClosePlanModal} centered>
                 <Modal.Header closeButton> <Modal.Title>Choose or Define Plan</Modal.Title> </Modal.Header>
                 <Modal.Body>
                     <Form>
                         <h5>Select Existing Plan</h5>
                         <Form.Group controlId="planSelect" className="mb-3">
                            <Form.Control as="select" value={selectedPlan} onChange={handlePlanSelectChange}>
                                {subscription.availablePlans.map(plan => (<option key={plan.name} value={plan.name}>{plan.name} ({plan.cost})</option>))}
                            </Form.Control>
                         </Form.Group>
                         <hr />
                         <h5>Or Define a Custom Plan</h5>
                         <Form.Group controlId="customPlanName" className="mb-3">
                            <Form.Label>Custom Plan Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter custom plan name" value={customPlanName} onChange={handleCustomPlanNameChange} />
                         </Form.Group>
                         <Form.Group controlId="customPlanCost" className="mb-3">
                            <Form.Label>Custom Plan Cost</Form.Label>
                            <Form.Control type="text" placeholder="Enter cost (e.g., $1500)" value={customPlanCost} onChange={handleCustomPlanCostChange} />
                         </Form.Group>
                         <p className='text-muted small'>If custom fields are filled, they will override the selection above.</p>
                     </Form>
                 </Modal.Body>
                 <Modal.Footer>
                     <Button variant="secondary" onClick={handleClosePlanModal}>Cancel</Button>
                     <Button variant="primary" className="gradient" onClick={handleApplyPlanChanges}> Apply Changes </Button>
                 </Modal.Footer>
             </Modal>


            {/* Payment Method Modal */}
             <Modal show={showPaymentModal} onHide={handleClosePaymentModal} centered>
                 <Modal.Header closeButton> <Modal.Title>Change Payment Method</Modal.Title> </Modal.Header>
                 <Modal.Body>
                     <Form>
                         <Form.Group controlId="cardType" className="mb-3"> <Form.Label>Card Type</Form.Label> <Form.Control type="text" name="cardType" value={tempPaymentDetails.cardType} onChange={handlePaymentInputChange} placeholder="e.g., Master Card, Visa" required /> </Form.Group>
                         <Form.Group controlId="cardNumber" className="mb-3"> <Form.Label>Card Number</Form.Label> <Form.Control type="text" name="cardNumber" value={tempPaymentDetails.cardNumber} onChange={handlePaymentInputChange} placeholder="**** **** **** ****" required /> </Form.Group>
                         <Row className="mb-3">
                             <Form.Group as={Col} controlId="expiryMonth"> <Form.Label>Expiry Month</Form.Label> <Form.Control type="text" name="expiryMonth" value={tempPaymentDetails.expiryMonth} onChange={handlePaymentInputChange} placeholder="MM" maxLength="2" required /> </Form.Group>
                             <Form.Group as={Col} controlId="expiryYear"> <Form.Label>Expiry Year</Form.Label> <Form.Control type="text" name="expiryYear" value={tempPaymentDetails.expiryYear} onChange={handlePaymentInputChange} placeholder="YYYY" maxLength="4" required /> </Form.Group>
                         </Row>
                         <Form.Group controlId="email" className="mb-3"> <Form.Label>Billing Email</Form.Label> <Form.Control type="email" name="email" value={tempPaymentDetails.email} onChange={handlePaymentInputChange} placeholder="name@example.com" required /> </Form.Group>
                         <Form.Group controlId="cardImage" className="mb-3"> <Form.Label>Upload Card Image (Optional)</Form.Label> <Form.Control type="file" accept="image/*" onChange={handleCardImageChange} /> {cardImagePreview && (<div className="mt-2"> <Image src={cardImagePreview} alt="Card Preview" thumbnail fluid style={{ maxHeight: '100px' }} /> </div>)} </Form.Group>
                     </Form>
                 </Modal.Body>
                 <Modal.Footer>
                     <Button variant="secondary" onClick={handleClosePaymentModal}>Cancel</Button>
                     <Button variant="primary" className="gradient" onClick={handleSavePayment}>Save Changes</Button>
                 </Modal.Footer>
             </Modal>


            {/* Add Invoice Modal */}
             <Modal show={showAddInvoiceModal} onHide={handleCloseAddInvoiceModal} centered>
                 <Modal.Header closeButton> <Modal.Title>Add New Invoice</Modal.Title> </Modal.Header>
                 <Form onSubmit={handleAddInvoice}>
                     <Modal.Body>
                          <Form.Group controlId="newInvoiceId" className="mb-3"> <Form.Label>Invoice ID</Form.Label> <Form.Control type="text" name="id" value={newInvoice.id} readOnly /> </Form.Group>
                          <Form.Group controlId="newInvoiceDate" className="mb-3"> <Form.Label>Billing Date</Form.Label> <Form.Control type="date" name="date" value={newInvoice.date} onChange={handleNewInvoiceChange} required /> </Form.Group>
                          <Form.Group controlId="newInvoicePlan" className="mb-3"> <Form.Label>Plan</Form.Label> <Form.Control type="text" name="plan" value={newInvoice.plan} onChange={handleNewInvoiceChange} placeholder="e.g., Pro Plan" required /> </Form.Group>
                          <Form.Group controlId="newInvoiceAmount" className="mb-3"> <Form.Label>Amount</Form.Label> <Form.Control type="text" name="amount" value={newInvoice.amount} onChange={handleNewInvoiceChange} placeholder="e.g., $7000 or 7000.00" required /> </Form.Group>
                          <Form.Group controlId="newInvoiceStatus" className="mb-3"> <Form.Label>Status</Form.Label> <Form.Control as="select" name="status" value={newInvoice.status} onChange={handleNewInvoiceChange} required > <option value="Pending">Pending</option> <option value="Paid">Paid</option> <option value="Overdue">Overdue</option> </Form.Control> </Form.Group>
                     </Modal.Body>
                     <Modal.Footer>
                         <Button variant="secondary" onClick={handleCloseAddInvoiceModal}>Cancel</Button>
                         <Button variant="success" type="submit"> <FontAwesomeIcon icon={faPlus} /> Add Invoice</Button>
                     </Modal.Footer>
                 </Form>
             </Modal>


            {/* Edit Invoice Modal */}
            <Modal show={showEditInvoiceModal} onHide={handleCloseEditInvoiceModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Invoice ({editingInvoice?.id})</Modal.Title>
                </Modal.Header>
                {currentEditingInvoiceData && ( // Render form only when data is ready
                    <Form onSubmit={handleUpdateInvoice}>
                        <Modal.Body>
                                <Form.Group controlId="editInvoiceId" className="mb-3"> <Form.Label>Invoice ID</Form.Label> <Form.Control type="text" name="id" value={currentEditingInvoiceData.id} readOnly /> </Form.Group>
                                 <Form.Group controlId="editInvoiceDate" className="mb-3"> <Form.Label>Billing Date</Form.Label> <Form.Control type="date" name="date" value={currentEditingInvoiceData.date} onChange={handleEditInvoiceChange} required /> </Form.Group>
                                 <Form.Group controlId="editInvoicePlan" className="mb-3"> <Form.Label>Plan</Form.Label> <Form.Control type="text" name="plan" value={currentEditingInvoiceData.plan} onChange={handleEditInvoiceChange} placeholder="e.g., Pro Plan" required /> </Form.Group>
                                 <Form.Group controlId="editInvoiceAmount" className="mb-3"> <Form.Label>Amount</Form.Label> <Form.Control type="text" name="amount" value={currentEditingInvoiceData.amount} onChange={handleEditInvoiceChange} placeholder="e.g., $7000 or 7000.00" required /> </Form.Group>
                                 <Form.Group controlId="editInvoiceStatus" className="mb-3"> <Form.Label>Status</Form.Label> <Form.Control as="select" name="status" value={currentEditingInvoiceData.status} onChange={handleEditInvoiceChange} required > <option value="Pending">Pending</option> <option value="Paid">Paid</option> <option value="Overdue">Overdue</option> </Form.Control> </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseEditInvoiceModal}> Cancel </Button>
                            <Button variant="primary" type="submit" className="gradient"> Save Changes </Button>
                        </Modal.Footer>
                    </Form>
                )}
            </Modal>

        </Container>
    );
};

export default Billing;