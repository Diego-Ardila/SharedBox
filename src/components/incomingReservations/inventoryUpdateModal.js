import React, { useState } from 'react'
import {Modal, Col,Row} from "react-bootstrap"
import { updateElements } from '../../utils/HTTPrequests'
import InvetoryUpdateForm from './inventoryUpdateForm'
import InventoryUpdateRendericer from './inventoryUpdateRendericer'



export default function InventoryUpdateModal({showModal,onHide,elements,change}){
    const [element,setElement] = useState({})
    const [selected,setSelected] = useState("")
    
    const handleUpdateElement = (values)=>{
        const {id,...rest}=values
        updateElements(id,rest)
        change()
        setElement({})
        setSelected("")
        
    }

    const handleSelectElement = (event,element) => {
        setElement(element)
        setSelected(event.target.closest(".toast").id)
    }

    return(
        <Modal show={showModal} onHide = {onHide} size="xl">
            <Modal.Header closeButton={true}>
                <Modal.Title>update what are you going to store</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col className="col-lg-5">
                        <InventoryUpdateRendericer elements={elements} handleSelect={handleSelectElement} selected={selected}/>
                    </Col>
                    {Object.keys(element).length===0?null:
                    <Col className="col-lg-6">
                        <InvetoryUpdateForm handleUpdateElement={handleUpdateElement} element={element}/>
                    </Col>
                    }
                </Row>
            </Modal.Body>
        </Modal>
    )
}