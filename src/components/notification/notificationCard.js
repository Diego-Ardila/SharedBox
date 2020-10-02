 import {Card,Badge,Row} from 'react-bootstrap'
 import React from 'react'
 import {Check2Square,ExclamationSquare,XSquare} from 'react-bootstrap-icons'
  
 export default function CardNotification ({notification, setValuesCard, selected}){
    
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
        case "paid":
            message.lenderHeader = `Your space ${titleSpace} is reserved `;
            message.lenderBody = `The user  ${nameTenant}  is going to take your space ${titleSpace} from ${initialDate} to  ${finalDate}`;
            message.tenantHeader = `The ${titleSpace} is now reserved by you `;
            message.tenantBody = `Now the space ${titleSpace} is yours, congratulations!!`;
            colorBadge="success"
            break; 
        case "accept":
            message.lenderHeader = `You accepted the offer for space ${titleSpace} `;
            message.lenderBody = `Let's wait for the user  ${nameTenant} to pay the rent and then he is going to be able to take your space ${titleSpace} from ${initialDate} to  ${finalDate}`;
            message.tenantHeader = `The ${titleSpace}'s owner accepted your offer`;
            message.tenantBody = `The lender ${nameLender} accepted your offer for his space ${titleSpace}, congratulations!!`;
            colorBadge="success"
            break; 
        case "reject":
            message.tenantHeader = `The  offer for ${titleSpace} was rejected by his lender ${nameLender}`;
            message.tenantBody = `Don´t worry lets keep searching the perfect space for you`;
            colorBadge="danger"
            break;   
        case "pending":
            message.lenderHeader = `You received an offer for the space ${titleSpace} from ${initialDate} to  ${finalDate}`;
            message.lenderBody = `The user ${nameTenant} has sent you an offer to rent your space ${titleSpace}`;
            message.tenantHeader = `Your offer was sent to ${nameLender}, owner of the space ${titleSpace}, let's wait for his answer`;
            message.tenantBody = `You want to reserved the space ${titleSpace} from ${initialDate} to ${finalDate}`;
            colorBadge="warning"
            break;
        case "rejected-element":
            message.lenderHeader = `You sended inconsistencies between objects received for the space ${titleSpace}`;
            message.lenderBody = `The user ${nameTenant} has received inconsistencies that you identified for your space ${titleSpace}, please wait for the  answer `;
            message.tenantHeader = `The user ${nameLender} has pointed out that there is an inconsistancy between what you said you would bring to the space ${titleSpace} and what he/she recieved.`;
            message.tenantBody = `Don´t worry! just check your inventory and clarify any misleading information. This is necesary to guarantee that we can cover all your products just in case something were to happen.`;
            colorBadge="warning"
            break;
        case "updated-element":
            message.lenderHeader = `The tenant ${nameTenant} updated to the elements of the inventory for the space ${titleSpace}`;
            message.lenderBody = `The user ${nameTenant} updated the inventory elements for your space ${titleSpace}, please check to changes.`;
            message.tenantHeader = `The user ${nameLender} has received the changes of the elements for the space ${titleSpace}, please wait for his answer.`;
            message.tenantBody = `The user ${nameLender} has received the changes of the elements for the space ${titleSpace} and  is checking now there not inconsistency`;
            colorBadge="warning"
            break;
        default:
            break

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
                                {status === "paid" && <Check2Square size = {25}/>}
                                {status === "reject" && <XSquare size = {25}/>}
                                {status === "rejected-element" && <XSquare size = {25}/>}
                                {status === "updated-element" && <ExclamationSquare size = {25}/>}
                                {status === "pending" && <ExclamationSquare size = {25}/>}
                            </Badge>
                        </Row>
                    </Card.Footer>

                </Card>
            }
        </React.Fragment>
    )
 }