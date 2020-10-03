import React, { useEffect, useState } from 'react'
import {Modal, Col,Row} from "react-bootstrap"
import { updateElements, getElementsByInventoryId } from '../../utils/HTTPrequests'
import InvetoryUpdateForm from './inventoryUpdateForm'
import InventoryUpdateRendericer from './inventoryUpdateRendericer'
import './incomingReservation.css'
import swal from 'sweetalert'



export default function InventoryUpdateModal({showModal,onHide,inventoryId,change}){
    const [element,setElement] = useState({})
    const [elements,setElements] = useState([])
    const [selected,setSelected] = useState("")
    const [elementRejected,setElementRejected] = useState(false)
   
    useEffect(()=>{        
        if(inventoryId && showModal){
            const newElements = async()=>{
                try{
                   const elemes = await getElementsByInventoryId(inventoryId)
                    setElements(elemes) 
                }catch(err){
                    swal ("Elements got failed", "Failed connection to dataServer, check your connection to the internet and try again later", "error") 
                }            
            }
        newElements()
        }
    },[showModal,element])    
    
    const handleUpdateElement =  async (values)=>{
        try {
            const {id,...rest}=values
            const data = {...rest,status:"updated",comment:"",errorCategory:"select"}
            await updateElements(id,data)
            change()
            setElement({})
            setSelected("")
            setElementRejected(false)
        }catch(err){
            swal ("Update Failed", "Failed connection to dataServer, check your connection to the internet and try again later", "error") 
        }        
    }    

    const handleSelectElement = (event,element) => {
        setElement(element)
        setSelected(event.target.closest(".toast").id)
    }

    const handleCloseModal = () =>{
        onHide()
        setElements([])
        setElement({})
        setSelected("")
    }

    const showMenssageReject =()=>{
        setElementRejected(true)
    }
    
    return(
        <Modal className="modalUpdateInventory" show={showModal} onHide = {()=>handleCloseModal()} size="xl">
            <Modal.Header closeButton={true} >
                <Modal.Title>Update what are you going to store</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            {elementRejected && <p>Please update the Object</p>}
                <Row>
                    <Col className="col-lg-5">
                        <InventoryUpdateRendericer elements={elements} handleSelect={handleSelectElement} selected={selected} showMenssageReject={showMenssageReject}/>
                    </Col>
                    {Object.keys(element).length===0?null:
                    <Col className="col-lg-6">
                        <InvetoryUpdateForm handleUpdateElement={handleUpdateElement} element={element} />
                    </Col>
                    }
                </Row>
            </Modal.Body>
        </Modal>
    )
}