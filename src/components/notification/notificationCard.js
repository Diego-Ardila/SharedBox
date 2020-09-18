 import {Card,Badge} from 'react-bootstrap'
 import React from 'react'
  
 export default function CardNotification ({notification, setValuesCard, selected}){
    
    let titleSpace = notification.inventoryId.spaceId.title
    let nameTenant = notification.tenantId.name    
    let nameLender = notification.lenderId.name
    let initialDate = notification.datesReservedId.initialDate
    let finalDate = notification.datesReservedId.finalDate    
    let status = notification.status
    let typeUser = localStorage.getItem("typeUser")
    let message = { 
        lenderHeader:"",
        lenderBody:"",
        tenantHeader:"",
        tenantBody:"",            
    }

switch(status){
    case "accept":
        message.lenderHeader = `Your space ${titleSpace} is reserved `;
        message.lenderBody = `The user  ${nameTenant}  is going to take your space ${titleSpace} from ${initialDate} to  ${finalDate}`;
        message.tenantHeader = `The ${titleSpace} is now reserved by you `;
        message.tenantBody = `The lender ${nameLender} accepted your offer for his spaces ${titleSpace}, congratulations!!`;
        break; 
    case "reject":
        message.tenantHeader = `The  offer for ${titleSpace} was rejected by his lender ${nameLender}`;
        message.tenantBody = `Don´t worry lets keep searching the perfect space for you`;
        break;   
    default:
        message.lenderHeader = `You recived an offer for the space ${titleSpace} from ${initialDate} to  ${finalDate}`;
        message.lenderBody = `The user ${nameTenant} sent you an offer to rent your space ${titleSpace}`;
        message.tenantHeader = `Your offer was sent to ${nameLender}, owner of the space ${titleSpace}, lets wait for his answer`;
        message.tenantBody = `You want to reserved The space ${titleSpace} from ${initialDate} to ${finalDate}`;
        break;
}


    
    return (
        <Card   id={notification._id} 
                key={notification._id} 
                onClick={(e)=>{setValuesCard(e,notification)}} 
                className="m-4 notificationCard" 
                border="primary" 
                bg={notification._id === selected ? "secondary" : null } 
                text={notification._id === selected ? "white" : null }>
            <Card.Header> 
                <Card.Title>{typeUser==="lender" ? message.lenderHeader : message.tenantHeader}</Card.Title>
            </Card.Header>
            <Card.Body>
                <Card.Text>{typeUser==="lender" ? message.lenderBody : message.tenantBody}</Card.Text>
            </Card.Body>
            <Card.Footer>
                <Card.Text>Click here for more info</Card.Text> <Badge variant="primary">hello</Badge>
            </Card.Footer>

        </Card>
    )
 }