import React from 'react'
import {Container,Row,Col} from "react-bootstrap"
import { Toast } from "react-bootstrap"


export default function RendericerElement ({elements,deleteObj}){
    
    return (
        <Container>
            {
                elements.map(({id,object,quantity,description,category,value})=>{
                    return(
                        <Toast show={true} onClose={deleteObj(id)}>
                            <Toast.Header>
                                <strong className="mr-auto" >{object}</strong>
                            </Toast.Header>
                            <Toast.Body>
                                <Row className="m-2">
                                    <Col><strong>Quantity:</strong></Col> <Col>{quantity}</Col>
                                    <Col><strong>Value:</strong></Col> <Col>{value}</Col>
                                </Row>
                                <Row className="m-2">
                                    <Col><strong>Category:</strong></Col><Col>{category}</Col>
                                </Row>
                                <Row className="m-2">
                                    <Col><strong>Description:</strong></Col><Col>{description}</Col>
                                </Row>
                            </Toast.Body>
                        </Toast>
                    )
                })
            }
        </Container>
    )    
}