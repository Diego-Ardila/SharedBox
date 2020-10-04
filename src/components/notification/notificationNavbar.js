import React from 'react';
import './notificationNavbar.css';
import { Card, Col, Row, Image } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import moment from "moment"


const NotificationNavbar = ({ notification, onClick }) => {
  let notificationDate = moment(notification.createdAt);
  let array = [];
  let arrayRanges = ['months','weeks','days','hours','minutes'];
  array.push({date: moment().diff(notificationDate,'months'), type: 'months'});
  for (let i = 0; i < arrayRanges.length;i++){
    if (array[i].date < 1){
      array.push({date: moment().diff(notificationDate,arrayRanges[i]), type: arrayRanges[i]});
    } else {
      break
    }      
  }
  let length = array.length
  return (    
    <NavLink to={{pathname: "/notification", navbarId: notification._id }} onClick={() => onClick()}>
    <Card hover style={{width: '328px'}} className="ml-2 mr-2 border-0">
      <Row>
        <Col lg={4} md={4}>
          <Image rounded width={100} height={70} src={notification.inventoryId.spaceId.photos[0] || 'https://www.freeiconspng.com/uploads/no-image-icon-15.png'}/>          
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
