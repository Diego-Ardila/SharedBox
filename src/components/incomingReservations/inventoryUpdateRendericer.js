import React from 'react'
import {Container,Row,Col} from "react-bootstrap"
import { Toast } from "react-bootstrap"
import './incomingReservation.css'


export default function InventoryUpdateRendericer ({elements,handleSelect,selected,showMenssageReject}){
    return (
        <Container>
            {
                elements.map((element)=>{
                    if(element.status === "rejected") {showMenssageReject()}
                    return(
                        <Toast 
                            className={`toastupdate ${selected === element._id?"darkToast":" "} ${element.status === "rejected"?"alertToast":""}` } 
                            id={element._id} 
                            key={element._id} 
                            show={true} 
                            onClick={(e)=>handleSelect(e,element)}  >
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
                                {element.status === "rejected" &&
                                <Row className="m-2">
                                    <Row>
                                        <Col><strong>Status:</strong> {element.status}</Col> 
                                    </Row>
                                    <Row>
                                        <Col><strong>Error category:</strong> {element.errorCategory}</Col> 
                                    </Row>
                                    <Row>
                                        <Col><strong>Comment error:</strong> {element.comment}</Col> 
                                    </Row>
                                </Row>}                                                                
                            </Toast.Body>
                            
                        </Toast>
                    )
                })
            }
        </Container>
    )    
}