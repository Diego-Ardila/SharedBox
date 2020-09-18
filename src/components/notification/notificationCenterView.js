import React, { useEffect, useState } from 'react'
import {Col, Row, Image} from 'react-bootstrap'
import {getNotificationUser} from '../../utils/HTTPrequests'
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
    
    useEffect(()=>{
        async function getNotification (){
            const notification = await getNotificationUser()
            setArrNotifications(notification.data)
        }
        getNotification()       
    },[])

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