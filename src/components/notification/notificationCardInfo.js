import {Col,Row,Card,Accordion,Button} from 'react-bootstrap'
import React from 'react'
import PayButton from './payButton';

export default function CardNotificationInfo ({notification, calPrice}){
    
    let titleSpace = notification.inventoryId.spaceId.title
    let initialDate = notification.datesReservedId.initialDate
    let finalDate = notification.datesReservedId.finalDate
    let nameTenant = notification.tenantId.name
    let idTenant = notification.tenantId._id
    let phoneNumberTenant = notification.tenantId.phoneNumber
    let nameLender = notification.lenderId.name
    let phoneNumberLender = notification.lenderId.phoneNumber
    let objects = notification.inventoryId.elements
    let typeUser = localStorage.getItem("typeUser")
    let status = notification.status||"accepte"
    let message = { 
            lenderHeader:"",
            tenantHeader:"",            
        }

    switch(status){
        case "accept":
            message.lenderHeader = `Your space ${titleSpace} is reserved now from the ${initialDate} to the ${finalDate}`;
            message.tenantHeader = `the ${titleSpace} is now reserved for you from the ${initialDate} to the  ${finalDate}`;
            break; 
        case "reject":
            message.tenantHeader = `the ${titleSpace} is rejected for lender of ${initialDate} to  ${finalDate}`;
            break;   
        default:
            message.lenderHeader = `You recived an offer for the space ${titleSpace} on the dates ${initialDate} to  ${finalDate}`;
            message.tenantHeader = `the space ${titleSpace} recived your reservation offer for dates ${initialDate} to ${finalDate}`;
            break;
    }

    return (
        <Card className="m-2" bg="secondary" border="dark" text="white">
            <Card.Header as="h5" className="text-center" > 
                {typeUser==="lender"? message.lenderHeader : message.tenantHeader} 
            </Card.Header>
            <Card.Body >
                {typeUser==="tenant" && !status && <Card.Text>we will contact you as soon as we get a response thank you</Card.Text>}
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
                            <Card bg="primary">
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
                {localStorage.getItem("typeUser")==="lender"?
                <div>
                    <Button className="mr-2">Reject</Button>
                    <Button>Accept</Button>
                </div> : status==="accept" && 
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
                            tenantId={idTenant}/>}
            </Card.Footer>
        </Card>
    )
}