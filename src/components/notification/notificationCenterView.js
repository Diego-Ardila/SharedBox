import React, { useEffect, useState } from 'react'
import {Col, Row, Image, Card, Button, Container, Carousel} from 'react-bootstrap'
import {getNotificationUser, updateNotification} from '../../utils/HTTPrequests'
import Logo from "../../logo.svg";
import moment from "moment" 
import NotificationCard from './notificationCard'
import NotificationCardInfo from './notificationCardInfo'
import {calcPrices} from '../../utils/FinanceVariables'
import {useHistory} from 'react-router-dom'
import './notificationCenterView.scss'
import swal from 'sweetalert';


export default function NotificationCenterView ({navbarId}){
    const [arrNotifications,setArrNotifications] = useState([])
    const [notification,setNotification]= useState({})    
    const [calPrice,setCalPrice] = useState("")
    const [selected,setSelected] = useState(navbarId || "")
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

    const handleSubmit = (event,notification)=>{
        async function updateNotifi (){
            try{
                await updateNotification(event,notification)
                swal("reservation request sent","your reservation request was sent succesfully","success",{timer:1500,buttons:false})
            }
            catch(err){
                swal("notification request error", "something went wrong, please try again", "error")
            }
        }
        swal({
         className:"confirm-notification-swal",
         title :  `Are you sure to ${event} this reserve?` ,
         text: "You won't be able to revert this!",
         icon: "warning",
         buttons:{
            confirm:{
                className: `${event}`,
                text: `Yes, I want to ${event}`,
                value: "Confirm",
            },
            cancel:"Cancel",
         }
        })
        .then((value)=>{
            if (value === "Confirm"){
                updateNotifi ()
                setRender(true) 
                setSelected("")               
                setNotification({})
                
            }
        })
    }
    
    const setValuesCard = (event,notification,navbarId) => {
        
        setNotification(notification)        
        setCalPrice(calcPrices(moment(notification.datesReservedId.initialDate,"YYYY-MM-DD"),moment(notification.datesReservedId.finalDate,"YYYY-MM-DD"),notification.inventoryId.spaceId.pricePerDay))
        if(navbarId)return setSelected(navbarId)
        setSelected(event.target.closest(".notificationCard").id)
    }
    
    return(
        <Container className="notificationContainer col-lg-12 mb-5" >
            
                <Col sm={12}>
                    <Carousel className="carousel-notification d-block d-lg-none " interval={null} >
                        {arrNotifications.length === 0 ?
                        
                            <Card  className=" m-4" border="dark" >
                                <Card.Header  className="text-center" > 
                                    <Card.Title as="h3"> no new notifications now, come back letter</Card.Title>
                                </Card.Header>
                                <Card.Body className="text-center">
                                    <Button onClick={()=>history.push("/home")}>Come to home</Button>
                                </Card.Body>
                            </Card>
                        :
                            arrNotifications.map(notifi=>(
                                <Carousel.Item >
                                    <NotificationCard 
                                        className="cardNotification"
                                        selected={selected} 
                                        key={notifi._id}  
                                        notification={notifi} 
                                        setValuesCard={setValuesCard}                                    
                                    />
                                </Carousel.Item>
                        ))} 
                    </Carousel>
                </Col>
            <Row>
                <Col className="d-none d-lg-block" >
                    {arrNotifications.length === 0 ?                        
                        <Card  className=" m-4" border="dark" >
                            <Card.Header  className="text-center" > 
                                <Card.Title as="h3"> There aren't new notifications now, come back later</Card.Title>
                            </Card.Header>
                            <Card.Body className="text-center">
                                <Button onClick={()=>history.push("/home")}>Come to home</Button>
                            </Card.Body>
                        </Card>
                    :
                        arrNotifications.map(notifi=>(
                            
                                <NotificationCard 
                                    className="cardNotification"
                                    selected={selected} 
                                    key={notifi._id}  
                                    notification={notifi} 
                                    setValuesCard={setValuesCard}                                    
                                />
                            
                    ))} 
                </Col>
                <Col >
                    <div className="sticky-top pt-3 ">
                        {Object.keys(notification).length !== 0 
                            ? <NotificationCardInfo
                                className="cardNotificationInfo"
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