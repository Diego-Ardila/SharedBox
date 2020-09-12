import React, {useState} from "react"
import { Row, Col, Button, Container } from 'react-bootstrap';
import PhotosAdministrator from './PhotosAdministrator';
import EditButton from "./EditButton";
import GeneralInfoAdministrator from "./GeneralInfoAdministrator";
import PhotosEditor from "./photosEditor"    
import { ArrowLeftShort } from "react-bootstrap-icons"
import styled from "styled-components"
import {useDispatch} from 'react-redux'
import {changePhotos} from '../../actions/publishArea.actions'
import { useEffect } from "react";
import FAQadministrator from "./FAQadminstrator";
import FrequentAskedQuestions from "../../pages/frequentAsked";
import ModalInventory from "../Inventory/inventoryModal"
import Calendar from "../viewSpaces/calendar";

const RoundedBttn = styled.button`
    cursor: pointer;
    color: #fff;
    background-color: #007bff;
    border-color: #007bff;
    z-index:1040;
`

export default function SpecificSpaceView ({spaces, spaceId, changeViewToDisplay, edit, instartDate, inendDate}){   
  const dispatch = useDispatch()
  const [showModal,setShowModal] = useState(false)
  const [showModalInventory,setShowModalInventory] = useState(false)
  const [loading, setLoading] = useState(true)
  const [editFAQ, setEditFAQ] = useState(false)
  const [startDate, setStartDate] = useState(instartDate)
  const [endDate, setEndDate] = useState(inendDate)  
  const renderingSpace = spaces.find( space => space._id === spaceId)
    
    useEffect(()=>{
      dispatch(changePhotos(renderingSpace.photos))
      setLoading(false)
      // document.getElementById("start_date_id").click()
    },[])
    
    const hideEditFAQ = () => {
      setEditFAQ(false)
    }

    const settingDates = (startDate, endDate) => {
      setStartDate(startDate)
      setEndDate(endDate)
    }
    
    return(
      <React.Fragment>
        {loading ? "loading" : (
          <React.Fragment>
            <Row  className="m-2">
                <RoundedBttn className="ml-4" onClick={changeViewToDisplay()}><ArrowLeftShort size={30}></ArrowLeftShort></RoundedBttn>
            </Row>
            <Row className="row justify-content-center p-3">
              <Col xs={12} lg={6} md={6} className="col-6 d-inline-flex flex-column justify-content-center">
                <h2>{renderingSpace.title}</h2> {!edit && <Button onClick={()=> setShowModalInventory(true)} >Reserve this space!!</Button>}
                <PhotosAdministrator className =" position-relative">
                {edit ? <EditButton onClick={()=>setShowModal(true)} className="z-index-3"></EditButton> : null}
                </PhotosAdministrator>
                <ModalInventory space={renderingSpace} show={showModalInventory} onHide={()=>setShowModalInventory(false)} ></ModalInventory>
                <PhotosEditor show={showModal} onHide={()=>setShowModal(false)}  space={renderingSpace} ></PhotosEditor>
                <GeneralInfoAdministrator space ={renderingSpace} edit={edit}></GeneralInfoAdministrator>
              </Col>
                <Col xs={12} lg={6} md={6} className="col-6 d-relative flex-column justify-content-center">
                <Container className="text-center m-3">
                  <Calendar 
                  space={renderingSpace} 
                  startDate={startDate}
                  endDate={endDate}
                  settingDates = {settingDates}
                  ></Calendar>
                </Container>
              </Col>
              </Row>
              <Row className="row justify-content-center p-3">
              <Col className="col-12 d-inline-flex flex-column">
                  <FAQadministrator space={renderingSpace}></FAQadministrator>
                  {edit && <Button onClick = {() => setEditFAQ(true) }>add FAQ questions</Button>}
                </Col>
              </Row>
              <Row>
                <Col className="col-12 d-inline-flex flex-column justify-content-center">
                  {editFAQ && <FrequentAskedQuestions setEditFAQ ={hideEditFAQ} spaceId ={spaceId}></FrequentAskedQuestions>}
                </Col>
              </Row>
            </React.Fragment>
        )}
      </React.Fragment>
  )
}