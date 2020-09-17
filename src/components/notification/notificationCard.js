 import {Card} from 'react-bootstrap'
 import React from 'react'
  
 export default function CardNotification ({notification, setValuesCard, selected}){
    return (
        <Card bg={notification._id === selected ? "secondary" : null } text={notification._id === selected ? "white" : null } id={notification._id} key={notification._id} onClick={(e)=>{setValuesCard(e,notification)}} className="m-4 notificationCard" border="primary">
            <Card.Header> 
                <Card.Title>the {notification.inventoryId.spaceId.title} recive a offer</Card.Title>
            </Card.Header>
            <Card.Body>
                <Card.Text>the user {notification.tenantId.name} wants to reserve your space</Card.Text>
            </Card.Body>
        </Card>
    )
 }