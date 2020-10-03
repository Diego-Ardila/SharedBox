import {Col,Row,Card,Accordion,Button} from 'react-bootstrap'
import React from 'react'
import PayButton from './payButton';
import {useHistory} from 'react-router-dom'

export default function CardNotificationInfo ({handleSubmit, notification, calPrice}){
    
    let titleSpace = notification.inventoryId.spaceId.title
    let initialDate = notification.datesReservedId.initialDate
    let finalDate = notification.datesReservedId.finalDate
    let nameTenant = notification.tenantId.name
    let spaceId = notification.inventoryId.spaceId._id
    let idTenant = notification.tenantId._id
    let phoneNumberTenant = notification.tenantId.phoneNumber
    let nameLender = notification.lenderId.name
    let phoneNumberLender = notification.lenderId.phoneNumber
    let objects = notification.inventoryId.elements
    let typeUser = localStorage.getItem("typeUser")
    let status = notification.status
    const history = useHistory()
    let message = { 
            lenderHeader:"",
            tenantHeader:"",            
        }

    switch(status){
        case "accept":
            message.lenderHeader = `Your space ${titleSpace} is going to be reserved; let's wait for the tenant's to pay`;
            message.tenantHeader = `Your offer was accepted; the next step its to pay and then the space ${titleSpace} would be yours from ${initialDate} to the ${finalDate}`;
            break;
        case "paid":
            message.lenderHeader = `Your space ${titleSpace} is reserved now from the ${initialDate} to the ${finalDate}`;
            message.tenantHeader = `The ${titleSpace} is now reserved for you from the ${initialDate} to the  ${finalDate}`;
            break; 
        case "reject":
            message.tenantHeader = `The ${titleSpace} was rejected by the lender on the dates from ${initialDate} to  ${finalDate}`;
            break;   
        case "pending":
            message.lenderHeader = `You received an offer for the space ${titleSpace} on the dates ${initialDate} to  ${finalDate}`;
            message.tenantHeader = `The space ${titleSpace} received your reservation offer for dates ${initialDate} to ${finalDate}`;
            break;
        case "rejected-element":
            message.lenderHeader = `You sended inconsistencies between objects received for the space ${titleSpace},the tenant ${nameTenant} should update to objects`;
            message.tenantHeader = `The user ${nameLender} has pointed out that there is an inconsistency between what you said you would bring to the space`;
            break;
        case "updated-element":
            message.lenderHeader = `The user ${nameTenant} updated to the inventory elements for your space ${titleSpace}, your should check the objects again`;
            message.tenantHeader = `The user ${nameLender} has received the changes of the elements to validate that everything is fine`;
            break;
    }

    return (
        <Card className="m-2 pb-5" bg="secondary" border="dark" text="white">
            <Card.Header as="h5" className="text-center" > 
                {typeUser==="lender"? message.lenderHeader : message.tenantHeader} 
            </Card.Header>
            <Card.Body >
                {typeUser==="tenant" && status === "pending" && <Card.Text>We will contact you as soon as we get a response thank you</Card.Text>}
                <Row> 
                    <Col>
                        <Card.Title> For : {typeUser==="lender" ? nameTenant : nameLender} </Card.Title>
                    </Col>
                    <Col>
                        <Card.Title> Phone : {typeUser==="lender" ? phoneNumberTenant : phoneNumberLender} </Card.Title>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Card.Title>Days Number : {calPrice.daysToPay}</Card.Title>
                    </Col>
                    <Col>
                        <Card.Title>{typeUser==="lender" ? `Expected Earnings : $${calPrice.basePrice}`:`Final price: $${calPrice.finalPrice}`}</Card.Title> 
                    </Col>
                </Row>                               
                    {objects.map(obj=>(
                        <Accordion key={obj._id}>
                            <Card className="m-2" bg="primary">
                                <Accordion.Toggle as={Button}  eventKey="0">
                                    <Card.Header><Card.Title>{obj.object}</Card.Title></Card.Header>
                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey="0">
                                    <Card.Body>
                                        <Row > 
                                            <Col><Card.Title >Quantity :</Card.Title><Card.Text>{obj.quantity}</Card.Text></Col>
                                            <Col><Card.Title >Value :</Card.Title><Card.Text>{obj.value}</Card.Text></Col>
                                        </Row>
                                        <Row > 
                                            <Col><Card.Title >Description :</Card.Title><Card.Text>{obj.description}</Card.Text></Col>
                                        </Row>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        </Accordion>                                        
                    ))}                            
            </Card.Body>
            <Card.Footer className="text-right">
                {typeUser==="lender" && status === "pending" && 
                    <div>
                        <Button onClick={
                                    e=>handleSubmit("reject",notification)
                                } className="mr-2">Reject</Button>
                        <Button onClick={
                                    e=>handleSubmit("accept",notification)
                                }>Accept</Button>
                    </div>
                }
                {typeUser==="tenant" && status==="accept" && 
                        <PayButton 
                            className="col-lg-3 ml-auto" 
                            block={true}  
                            finalPrice={calPrice.finalPrice}
                            tax={calPrice.taxes}
                            tax_base={calPrice.tax_base}
                            spaceTitle={titleSpace}
                            tenantName={nameTenant}
                            tenantPhoneNum={phoneNumberTenant}
                            numDays={calPrice.daysToPay}
                            inDate={initialDate}
                            finDate={finalDate}
                            tenantId={idTenant}
                            spaceId={spaceId}
                            notification={notification}/>                                               
                    }
                    {typeUser==="tenant" && status==="reject" && <Button onClick={()=>history.push("/home")}>Search more Spaces</Button>}
                    {typeUser==="tenant" && status==="rejected-element" && <Button onClick={()=>history.push({pathname:"/tenant/reservations",externalinventory: notification.inventoryId._id})}>Go to update objects</Button>}
                    {typeUser==="lender" && status==="updated-element" && <Button onClick={()=>history.push({pathname:"/lender/admin",externalSpaceId: notification.inventoryId.spaceId._id})}>Check the changes</Button>}
            </Card.Footer>
        </Card>
    )
}