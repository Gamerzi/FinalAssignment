import React, { useState } from 'react';
import { Button, Container, Row, Col, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import './Plans.css';

const Plans = () => {
  const [selectedPlan, setSelectedPlan] = useState('');

  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      price: '9.99',
      features: ['5 Projects', '10GB Storage', 'Basic Support', 'Basic Analytics'],
    },
    {
      id: 'pro',
      name: 'Pro',
      price: '29.99',
      features: ['Unlimited Projects', '100GB Storage', 'Priority Support', 'Advanced Analytics', 'Custom Domain'],
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: '99.99',
      features: ['Unlimited Everything', 'Dedicated Support', 'Custom Solutions', 'SLA Guarantee', 'API Access'],
    },
  ];

  const handleChange = (planId) => {
    setSelectedPlan(planId);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedPlan) {
      console.log('Selected plan:', selectedPlan);
      alert(`You selected the ${plans.find(plan => plan.id === selectedPlan).name} plan!`);
    } else {
      alert('Please select a plan.');
    }
  };

  return (
    <Container className="plans-container">
      <Row className="justify-content-center">
        <Col xs={12} md={11} lg={12}>
          <h2 className="text-center mb-4">Plans & Add-ons</h2>

          <Row className="plans-row">
            {plans.map((plan, index) => {
              const isProPlan = plan.id === 'pro';
              return (
                <Col key={plan.id} xs={12} md={4} lg={4} className="plan-col">
                  <Card
                    className={`plan-card ${isProPlan ? 'pro-plan' : ''} ${index === 1 ? 'highlighted' : ''}`}
                  >
                    <Card.Body className="d-flex flex-column">
                      {index === 1 && <div className="most-popular">Most Popular</div>}
                      <Card.Title className="text-center">{plan.name}</Card.Title>
                      <div className="price-container">
                        <span className="price">${plan.price}</span>
                        <span className="per-month">/month</span>
                      </div>
                      <ul className="list-unstyled mt-3 flex-grow-1">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="mb-1">
                            <FontAwesomeIcon icon={faCheck} className="me-2" />
                            {feature}
                          </li>
                        ))}
                      </ul>

                      <Button
                        variant={index === 1 ? 'primary' : 'light'}
                        className={`w-100 plan-button ${index === 1 ? 'upgrade-button' : 'get-started-button'}`}
                        onClick={() => handleChange(plan.id)}
                        disabled={selectedPlan === plan.id}
                      >
                        {index === 1 ? 'Upgrade Plan' : 'Get Started'}
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Plans;