import React from 'react';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import './Billing.css';
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faCheckCircle, faCreditCard, faEnvelope, faSort } from '@fortawesome/free-solid-svg-icons';

const Billing = () => {

  const invoices = [
    { id: '#23456', date: '23 Jan 2023', plan: 'Basic Plan', amount: '$1200', status: 'Paid' },
    { id: '#56489', date: '23 Feb 2023', plan: 'Pro Plan', amount: '$7000', status: 'Paid' },
    { id: '#56489', date: '23 Mar 2023', plan: 'Pro Plan', amount: '$7000', status: 'Paid' },
    { id: '#98380', date: '23 Apr 2023', plan: 'Growth Plan', amount: '$5698', status: 'Paid' },
    { id: '#90394', date: '23 May 2023', plan: 'Basic Plan', amount: '$1200', status: 'Paid' },
    { id: '#929348', date: '23 Jun 2023', plan: 'Growth Plan', amount: '$1200', status: 'Paid' },
  ];

  const currentSubscription = {
    planName: 'Growth Plan',
    billingCycle: 'Monthly',
    planCost: '$5698',
    usage: 4850,
    totalUsers: 5000,
  };

  const paymentMethod = {
    cardType: 'Master Card',
    cardNumber: '**** **** **** 4002',
    expiry: 'Expiry on 20/2024',
    email: 'billing@acme.corp',
  };

  return (
    <Container className="billing-container">
      <h2>Billing</h2>
      <p className="billing-description">Effortlessly handle your billing and invoices right here.</p>

      <Row>
        <Col md={6}>
          {/* Current Plan Summary */}
          <div className="billing-section plan-summary">
            <div className="section-header">
              <h4>Current Plan Summary</h4>
            </div>
            <div className="plan-details">
              <div className="plan-detail">
                <p className="detail-label">Plan Name</p>
                <p className="detail-value">{currentSubscription.planName}</p>
              </div>
              <div className="plan-detail">
                <p className="detail-label">Billing Cycle</p>
                <p className="detail-value">{currentSubscription.billingCycle}</p>
              </div>
              <div className="plan-detail">
                <p className="detail-label">Plan Cost</p>
                <p className="detail-value">{currentSubscription.planCost}</p>
              </div>
              <div className="plan-detail button_detail">
                <Button variant="primary" className="change-button gradient button_adjust">Upgrade</Button>
              </div>
            </div>
          </div>
        </Col>

        <Col md={6}>
          {/* Payment Method */}
          <div className="billing-section payment-method new-card">
            <div className="payment-details">
               <div className="payment-logo">
                 </div>
                <p className="card-type">Master Card</p>
                <div className="payment-logo">
                <FontAwesomeIcon icon={faCreditCard} size="5x" color="red" />
                </div>
              <div className="payment-info">
                <p className="card-number">{paymentMethod.cardNumber}</p>
                <p className="expiry-date">Expiry on {paymentMethod.expiry}</p>
                <p className="billing-email"><FontAwesomeIcon icon={faEnvelope} /> {paymentMethod.email}</p>
                   <Button variant="outline-secondary" className="change-button gradient button_adjust">Change</Button>
              </div>
            </div>
          </div>
        </Col>
      </Row>

      {/* Invoice */}
      <div className="billing-section invoice-section">
        <div className="invoice-header">
          <h4>Invoice</h4>
        </div>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Invoice ID <FontAwesomeIcon icon={faSort} /></th>
              <th>Billing Date <FontAwesomeIcon icon={faSort} /></th>
              <th>Plan <FontAwesomeIcon icon={faSort} /></th>
              <th>Amount <FontAwesomeIcon icon={faCheckCircle} /></th>
              <th>Status </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr key={invoice.id}>
                <td>{invoice.id}</td>
                <td>{invoice.date}</td>
                <td>{invoice.plan}</td>
                <td>{invoice.amount}</td>
                <td>
                  {invoice.status === 'Paid' && (
                    <span className="status-paid">
                      Paid
                    </span>
                  )}
                </td>
                <td>...</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default Billing;