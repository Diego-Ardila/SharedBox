import React, {useState , useEffect} from 'react'
import {Modal,
        Row,
        Col,
        Button,
        Image,
        Container,
        Form,
        Card} from "react-bootstrap"
import { Formik } from 'formik'
import * as Yup from 'yup'
import InventoryForm from './inventoryForm'

export default function ModalInventory(props){

    const [arrForm, setArrForm] = useState([0])


return(
    <Modal {...props} size="xl" aria-labelledby="contained-modal-title-vcenter">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            The Lender wants to know what are you going to store=
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Container>
                <Row>
                    {arrForm.map((i)=>{
                            return(
                                <Col sm={3} md={6} xl={6}>
                                    <InventoryForm></InventoryForm>
                                </Col>) 
                            })} 
                    <Col sm={4} md={1} xl={1}>
                        <Button onClick={()=>{setArrForm(arrForm.concat(1))}}>+</Button>
                    </Col>
                </Row>
            </Container>
        </Modal.Body>
        <Modal.Footer>
            <Button>save</Button>
            <Button>close</Button>
        </Modal.Footer>
    </Modal>
)
}