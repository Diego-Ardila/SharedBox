 import {Card,Badge,Row} from 'react-bootstrap'
 import React from 'react'
 import {Check2Square,ExclamationSquare,XSquare} from 'react-bootstrap-icons'
  
 export default function CardNotification ({notification, setValuesCard, selected}){
    
    console.log(notification)
    let titleSpace = notification.inventoryId.spaceId.title
    let nameTenant = notification.tenantId.name    
    let nameLender = notification.lenderId.name
    let initialDate = notification.datesReservedId.initialDate
    let finalDate = notification.datesReservedId.finalDate
    let colorBadge = ""   
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
            colorBadge="success"
            break; 
        case "reject":
            message.tenantHeader = `The  offer for ${titleSpace} was rejected by his lender ${nameLender}`;
            message.tenantBody = `Don´t worry lets keep searching the perfect space for you`;
            colorBadge="danger"
            break;   
        default:
            message.lenderHeader = `You recived an offer for the space ${titleSpace} from ${initialDate} to  ${finalDate}`;
            message.lenderBody = `The user ${nameTenant} sent you an offer to rent your space ${titleSpace}`;
            message.tenantHeader = `Your offer was sent to ${nameLender}, owner of the space ${titleSpace}, lets wait for his answer`;
            message.tenantBody = `You want to reserved The space ${titleSpace} from ${initialDate} to ${finalDate}`;
            colorBadge="warning"
            break;
    }

    return (
        <React.Fragment>
            {notification.status === "reject" && typeUser==="lender"  ? null :
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
                        <Row>
                            <Card.Text className="ml-3">Click here for more info</Card.Text> 
                            <Badge variant={colorBadge} className="ml-auto" >
                                {status === "accept" && <Check2Square size = {25}/>}
                                {status === "reject" && <XSquare size = {25}/>}
                                {!status && <ExclamationSquare size = {25}/>}
                            </Badge>
                        </Row>
                    </Card.Footer>

                </Card>
            }
        </React.Fragment>
    )
 }