import React from 'react'
import {Container,Row,Col} from "react-bootstrap"
import { Toast } from "react-bootstrap"
import './incomingReservation.css'


export default function InventoryUpdateRendericer ({elements,handleSelect,selected}){
    console.log(elements)
    return (
        <Container>
            {
                elements.map((element)=>{
                    return(
                        <Toast className={`toast ${selected === element._id?"darkToast":" "}` } id={element._id} key={element._id} show={true} onClick={(e)=>handleSelect(e,element)}  >
                            <Toast.Header closeButton={false} >
                                <strong>{element.object}</strong>
                            </Toast.Header>
                            <Toast.Body>
                                <Row className="m-2">
                                    <Col><strong>Quantity:</strong></Col> <Col>{element.quantity}</Col>
                                    <Col><strong>Value:</strong></Col> <Col>{element.value}</Col>
                                </Row>
                                <Row className="m-2">
                                    <Col><strong>Category:</strong></Col><Col>{element.category}</Col>
                                </Row>
                                <Row className="m-2">
                                    <Col><strong>Description:</strong></Col><Col>{element.description}</Col>
                                </Row>
                            </Toast.Body>
                        </Toast>
                    )
                })
            }
        </Container>
    )    
}