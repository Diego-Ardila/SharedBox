import React, { useEffect, useState } from 'react'
import {Card, Col, Row, Button, Image, Accordion} from 'react-bootstrap'
import {getNotificationUser} from '../../utils/HTTPrequests'
import Logo from "../../logo.svg";
import {calcPrices} from '../../utils/FinanceVariables'
import moment from "moment" 
import NotificationCard from './notificationCard'
import PayButton from './payButton';

export default function NotificationCenterView (){
    const [arrNotifications,setArrNotifications] = useState([])
    const [titleSpace,setTitleSpace] = useState("")
    const [nameTenant,setNameTenant] = useState("")
    const [initDate,setInitDate] = useState("")
    const [endDate,setEndDate] = useState("")
    const [objects,setObjects] = useState([])
    const [calPrice,setCalPrice] = useState("")
    const [selected,setSelected] = useState("") 
    
    
    useEffect(()=>{
        async function getNotification (){
            const notification = await getNotificationUser()
            setArrNotifications(notification.data)
        }
        getNotification()       
    },[])

    
    
    const setValuesCard = (event,notification)=>{
        setNameTenant(notification.tenantId.name)
        setTitleSpace(notification.inventoryId.spaceId.title)        
        setInitDate(notification.datesReservedId.initialDate)
        setEndDate(notification.datesReservedId.finalDate)
        setObjects(notification.inventoryId.elements)
        setCalPrice(calcPrices(moment(notification.datesReservedId.initialDate,"YYYY-MM-DD"),moment(notification.datesReservedId.finalDate,"YYYY-MM-DD"),notification.inventoryId.spaceId.pricePerDay))
        setSelected(event.target.closest(".notificationCard").id)
    }
    
    
    return(
        <React.Fragment >
            <Row>
                <Col className="col-lg-5">
                    {arrNotifications.map(notifi=>(
                        <NotificationCard selected={selected} key={notifi._id}  notification={notifi} setValuesCard={setValuesCard} />
                    ))}                                
                </Col>
                <Col >
                    <div className="sticky-top pt-3 ">
                    {initDate !== "" ? 
                        <Card className="m-2" bg="secondary" border="dark" text="white">
                            <Card.Header as="h5" className="text-center" > Your spacer {titleSpace} will reserve of {initDate} at  {endDate} </Card.Header>
                            <Card.Body >
                                <Card.Title>For : {nameTenant} </Card.Title>
                                <Row>
                                    <Col>
                                        <Card.Title>Days Number : {calPrice.daysToPay}</Card.Title>
                                    </Col>
                                    <Col>
                                        <Card.Title>Expected Earnings : ${calPrice.basePrice}</Card.Title> 
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
                                                            <Col><Card.Title >Description :</Card.Title><Card.Text> {obj.description}</Card.Text></Col>
                                                        </Row>
                                                    </Card.Body>
                                                </Accordion.Collapse>
                                            </Card>
                                        </Accordion>                                        
                                    ))}                            
                            </Card.Body>
                            <Card.Footer className="text-right">
                                {localStorage.getItem("typeUser")==="lender"?
                                <div><Button className="mr-2">Reject</Button><Button>Accept</Button></div>
                                :<PayButton className="col-lg-3 ml-auto" block={true}></PayButton>}
                            </Card.Footer>
                        </Card> : <Image className="pt-5 m-5 w-50" src={Logo} alt="logo"></Image> }
                    </div>
                </Col>
            </Row>
        </React.Fragment>
    )
}