import React, { useEffect, useState } from 'react'
import {  Container } from 'react-bootstrap'
import {  getNotificationUser } from '../utils/HTTPrequests'
import Space from "../components/viewSpaces/Space"
import InventoryUpdateModal from '../components/incomingReservations/inventoryUpdateModal'
import swal from 'sweetalert'



export default function IncomingReservations (props){
 
    
    const [notifications,setnotifications] = useState([])
    const [loading, setloading]=useState(true)
    const [showUpdateModal, setShowUpdateModal]=useState(false)
    const [renderizer,setRenderizer] = useState(false)
    const [inventoryId,setInventoriId] = useState("")
     
    
    useEffect(()=>{
        const getSpace = async()=>{
            try{
                const notifications = await getNotificationUser()
                const notificationsPay = notifications.data.filter(notification=>notification.status==="rejected-element")
                setnotifications(notificationsPay)                    
                setloading(false)
            }
            catch(err){
                swal ("get notifications Failed", "Failed connection to dataServer, check your connection to the internet and try again later", "error") 
            }
                                  
        }
        getSpace()
        if (props.location.externalinventory){
            setShowUpdateModal(true)
            setInventoriId(props.location.externalinventory)
        }
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
    const onHide =()=>{
        setShowUpdateModal(false)
    }
    
    return(
        <Container className="container-fluid pb-3 mb-5">
            {loading?<h1>loading</h1>:(
                notifications.map(notification=>(
                    <Space id={notification.inventoryId.spaceId._id} key={notification.inventoryId.spaceId._id} space={notification.inventoryId.spaceId} infoFunction={infoFunction} notifi={notification}/>                   
                ))
            )}
            <InventoryUpdateModal showModal={showUpdateModal} onHide={onHide} inventoryId={inventoryId} change={changeRenderize}/>
        </Container>
    )

}