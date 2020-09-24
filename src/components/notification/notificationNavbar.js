import React from 'react';
import { Card, Col, Row, Image } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';


const NotificationNavbar = ({ notification }) => {
  return (    
    <NavLink to={{pathname: "/notification", navbarId: notification._id }} className="ml-1 mr-1">
    <Card hover style={{width: '328px',height: '91px'}} className="ml-2 mr-2 border-0">
      <Card.Body>
      <Row>
        <Col lg={4} md={4}>
          <Image rounded width={100} height={70} src={notification.inventoryId.spaceId.photos[0]}/>          
        </Col>
        <Col lg={8} md={8}>                      
            <Card.Text>
              <span className="font-weight-bold">{notification.tenantId.name}</span> has sent you an offer for rent your space <span className="font-weight-bold">{notification.inventoryId.spaceId.title}</span>
            </Card.Text>
            <Card.Subtitle>Send</Card.Subtitle>
        </Col>
      </Row>
      </Card.Body>
    </Card>
    </NavLink>
  );
};

export default NotificationNavbar;
