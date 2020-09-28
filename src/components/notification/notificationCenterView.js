import React, { useEffect, useRef, useState } from 'react'
import {Col, Row, Image, Card, Button, Container} from 'react-bootstrap'
import {getNotificationUser, updateNotification} from '../../utils/HTTPrequests'
import Logo from "../../logo.svg";
import moment from "moment" 
import NotificationCard from './notificationCard'
import NotificationCardInfo from './notificationCardInfo'
import {calcPrices} from '../../utils/FinanceVariables'
import {useHistory} from 'react-router-dom'
import './notificationCenterView.css'


export default function NotificationCenterView (props){
    const [arrNotifications,setArrNotifications] = useState([])
    const [notification,setNotification]= useState({})    
    const [calPrice,setCalPrice] = useState("")
    const [selected,setSelected] = useState(props.navbarId || "")
    const history = useHistory()
    const [render,setRender] = useState(false)
     
    
    useEffect(()=>{
        async function getNotification (){
            const notification = await getNotificationUser()
            setArrNotifications(notification.data)
            if(navbarId){
                const initialNotification = notification.data.filter(notification=>notification._id===navbarId)
                setValuesCard(null,initialNotification[0],navbarId)
            }
        }
        getNotification()
        setRender(false)
    },[render])

    const handleSubmit = async (event,notification)=>{
        setRender(true)
        await updateNotification(event,notification)
        setNotification({})
    }
    
    const setValuesCard = (event,notification,navbarId) => {
        
        setNotification(notification)        
        setCalPrice(calcPrices(moment(notification.datesReservedId.initialDate,"YYYY-MM-DD"),moment(notification.datesReservedId.finalDate,"YYYY-MM-DD"),notification.inventoryId.spaceId.pricePerDay))
        if(navbarId)return setSelected(navbarId)
        setSelected(event.target.closest(".notificationCard").id)
    }
    
    return(
        <Container className="notificationContainer col-lg-12" >
            <Row>
                <Col className="col-lg-5 d-flex flex-column ">
                    {arrNotifications.length === 0 ?
                     
                        <Card  className="m-4" border="dark" >
                            <Card.Header  className="text-center" > 
                                <Card.Title as="h3"> no new notifications now, come back letter</Card.Title>
                            </Card.Header>
                            <Card.Body className="text-center">
                                <Button onClick={()=>history.push("/home")}>Come to home</Button>
                            </Card.Body>
                        </Card>
                      :
                        arrNotifications.map(notifi=>(
                            <NotificationCard 
                                    selected={selected} 
                                    key={notifi._id}  
                                    notification={notifi} 
                                    setValuesCard={setValuesCard}
                                    
                                />
                    ))}                                
                </Col>
                <Col>
                    <div className="sticky-top pt-3 ">
                        {Object.keys(notification).length !== 0 
                            ? <NotificationCardInfo 
                                handleSubmit={handleSubmit}
                                notification={notification} 
                                calPrice={calPrice}/> 
                            : <Image 
                                    className="pt-5 m-5 w-50" 
                                    src={Logo} 
                                    alt="logo"/> }
                    </div>
                </Col>
            </Row>
        </Container>
    )
}