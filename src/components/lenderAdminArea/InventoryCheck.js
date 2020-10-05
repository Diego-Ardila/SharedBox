import React, { useEffect, useState } from "react"
import moment from "moment"
import { getNotificationUser } from "../../utils/HTTPrequests"
import swal from "sweetalert"
import {Card, Button} from "react-bootstrap"
import InventoryCheckElement from "./InventoryCheckElement"

const today = moment()

export default function InventoryCheck ({space}) {
    const [notificationToRender, setNotificationToRender] = useState(undefined) 

    const acceptedNotificationFromThisSpace = (space, notifications) => {
        const acceptedNotificationsFromThisSpace = notifications.filter( notification => notification.inventoryId.spaceId._id === space._id)
        return acceptedNotificationsFromThisSpace
    }

    const shouldRenderNotificationBasedOnDate = (today, acceptedNotifications) => {
        return acceptedNotifications.find( notification =>{
            const initialDate = moment(notification.datesReservedId.initialDate, "YYYY-MM-DD")
            const finalDate = moment(notification.datesReservedId.finalDate, "YYYY-MM-DD").add(1,"day")
            if(initialDate <= today && finalDate >= today) return true
            return false
        })
    }

    useEffect( () => {
        const getAcceptedNotifications = async () => {
            try{
                const response = await getNotificationUser()
                const acceptedNotifications = response.data.filter( notification => notification.status === "paid"||notification.status === "element-updated")
                const acceptedNotificationsOfThisSpace = acceptedNotificationFromThisSpace(space, acceptedNotifications)
                const render = shouldRenderNotificationBasedOnDate(today, acceptedNotificationsOfThisSpace)
                setNotificationToRender(render)
            }catch(err){
                swal("Something went wrong", "Check your internet connection and try again", "error")
            }
        }
        getAcceptedNotifications()
    }, [])
    
    return (
        <React.Fragment>
            {notificationToRender ?
                <Card className="text-center mt-3">
                    <Card.Header>Incoming reservation</Card.Header>
                    <Card.Body>
                    <Card.Title>You have a reservation on this warehouse for today!</Card.Title>
                    <Card.Text>
                        {notificationToRender.tenantId.name} will come to your place, get in touch
                        <strong><a href="#" onClick={()=> console.log("data")}> here </a></strong>
                        and make sure that he knows how to access your warehouse.
                        Also, make sure to check the inventory that {notificationToRender.tenantId.name} is 
                        leaving with you. This way if something happens we can help you to
                        cover any unexpected outcome. Don´t forget to fill out this checklist 
                        while you store the things on your space.
                    </Card.Text>
                    {notificationToRender.inventoryId.elements.map( element => {
                        if(element.status === "pending" || element.status === "updated") {
                            return <InventoryCheckElement element={element}></InventoryCheckElement>
                            }
                        })}
                    <Button variant="primary">Go somewhere</Button>
                    </Card.Body>
                    <Card.Footer className="text-muted">2 days ago</Card.Footer>
                </Card>
              : 
              null}
        </React.Fragment>
    )
}