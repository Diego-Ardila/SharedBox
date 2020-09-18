import React, { useEffect, useState } from 'react'
import {Card, Col, Row, Button, Image, Accordion} from 'react-bootstrap'
import {getNotificationUser, updateNotification} from '../../utils/HTTPrequests'
import Logo from "../../logo.svg";
import moment from "moment" 
import NotificationCard from './notificationCard'
import NotificationCardInfo from './notificationCardInfo'
import {calcPrices} from '../../utils/FinanceVariables'

export default function NotificationCenterView (){
    const [arrNotifications,setArrNotifications] = useState([])
    const [notification,setNotification]= useState({})    
    const [calPrice,setCalPrice] = useState("")
    const [selected,setSelected] = useState("") 
    const [render,setRender] = useState(false)
    
    useEffect(()=>{
        console.log(render)
        async function getNotification (){
            const notification = await getNotificationUser()
            setArrNotifications(notification.data)
        }
        getNotification()
        setRender(false)
    },[render])

    const handleSubmit = async (event,notification)=>{
        setRender(true)
        await updateNotification(event,notification)
    }
    
    const setValuesCard = (event,notification)=>{
        setNotification(notification)        
        setCalPrice(calcPrices(moment(notification.datesReservedId.initialDate,"YYYY-MM-DD"),moment(notification.datesReservedId.finalDate,"YYYY-MM-DD"),notification.inventoryId.spaceId.pricePerDay))
        setSelected(event.target.closest(".notificationCard").id)
    }
    
    return(
        <React.Fragment >
            <Row>
                <Col className="col-lg-5">
                    {arrNotifications.map(notifi=>(
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
        </React.Fragment>
    )
}