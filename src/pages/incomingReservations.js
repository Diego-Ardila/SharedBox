import React, { useEffect, useState } from 'react'
import {  Container } from 'react-bootstrap'
import {  getNotificationUser } from '../utils/HTTPrequests'
import Space from "../components/viewSpaces/Space"
import InventoryUpdateModal from '../components/incomingReservations/inventoryUpdateModal'



export default function IncomingReservations (){
 
    const [elements, setElements]=useState([])
    const [notifications,setnotifications] = useState([])
    const [loading, setloading]=useState(true)
    const [showUpdateModal, setShowUpdateModal]=useState(false)
    const [renderizer,setRenderizer] = useState(false)
    const [inventoryId,setInventoriId] = useState("")
     
    
    useEffect(()=>{
        const getSpace = async()=>{
            const notifications = await getNotificationUser()
            const notificationsPay = notifications.data.filter(notification=>notification.status==="accept")
            setnotifications(notificationsPay)
            setloading(false)
            
        }
        getSpace()
    },[renderizer])

    const changeRenderize = () =>{
        setRenderizer(!renderizer)
    }    

    const infoFunction = () =>{
        return (notification) => {
            return () => {
                setInventoriId(notification.inventoryId._id)
                setShowUpdateModal(true)
            }
        }
    }
    
    return(
        <Container className="container-fluid pb-3 mb-5">
            {loading?<h1>loading</h1>:(
                notifications.map(notification=>(
                    <Space key={notification._id} space={notification.inventoryId.spaceId} infoFunction={infoFunction} notifi={notification}/>                   
                ))
            )}
            <InventoryUpdateModal showModal={showUpdateModal} onHide={()=>setShowUpdateModal(false)} inventoryId={inventoryId} change={changeRenderize}/>
        </Container>
    )

}