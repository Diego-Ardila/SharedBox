import React from 'react';
import './notificationNavbar.css';
import { Card, Col, Row, Image } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import moment from "moment"


const NotificationNavbar = ({ notification }) => {
  let notificationDate = moment(notification.createdAt);
  let array = [];
  array.push({date: moment().diff(notificationDate,'months'), type: 'months'});
  if (array[0].date < 1) {
    array.push({date: moment().diff(notificationDate,'weeks'),type: 'weeks'});
    if (array[1].date < 1) {
      array.push({date: moment().diff(notificationDate,'days'),type: 'days'});
      if (array[2].date < 1) {
        array.push({date: moment().diff(notificationDate,'hours'),type: 'hours'});
        if (array[3].date < 1){
          array.push({date: moment().diff(notificationDate,'minutes'),type: 'minutes'}); 
        }  
      }
    }
  } 
  let length = array.length
  return (    
    <NavLink to={{pathname: "/notification", navbarId: notification._id }}>
    <Card hover style={{width: '328px'}} className="ml-2 mr-2 border-0">
      <Row>
        <Col lg={4} md={4}>
          <Image rounded width={100} height={70} src={notification.inventoryId.spaceId.photos[0]}/>          
        </Col>
        <Col lg={8} md={8}>                      
            <Card.Text>
              <p className="medium-text">
                <span className="font-weight-bold">{notification.tenantId.name}</span> has sent you an offer for rent your space <span className="font-weight-bold">{notification.inventoryId.spaceId.title}</span>
              </p>              
              <p className="small-text">
                {`${array[length-1].date} ${array[length-1].type} ago`}
              </p>              
            </Card.Text>
        </Col>
      </Row>
    </Card>
    </NavLink>
  );
};

export default NotificationNavbar;
