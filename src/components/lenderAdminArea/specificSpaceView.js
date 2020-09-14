import React, { useState } from "react"
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
import PriceAdministrator from "./PriceAdministrator";
import { useLocation } from "react-router-dom";
import moment from "moment"

const RoundedBttn = styled.button`
    cursor: pointer;
    color: #fff;
    background-color: #007bff;
    border-color: #007bff;
    z-index:1040;
`

export default function SpecificSpaceView ({spaces, spaceId, changeViewToDisplay, edit}){  
  
  const locationQuery = useLocation()  
  const dispatch = useDispatch()
  const [showModal,setShowModal] = useState(false)
  const [showModalInventory,setShowModalInventory] = useState(false)
  const [loading, setLoading] = useState(true)
  const [editFAQ, setEditFAQ] = useState(false)
  const [startDate, setStartDate] = useState(edit ? null : moment(locationQuery.search.slice(40,50),"YYYY-MM-DD"))
  const [endDate, setEndDate] = useState(edit ? null : moment(locationQuery.search.slice(59),"YYYY-MM-DD"))
  const [calendarIsOpen, setCalendarIsOpen] = useState(false)
  const renderingSpace = spaces.find( space => space._id === spaceId)
    
  useEffect(()=>{
    dispatch(changePhotos(renderingSpace.photos))
    setLoading(false)
  },[])
  
  const hideEditFAQ = () => {
    setEditFAQ(false)
  }
  
  const closeCalendar = () => {
    setCalendarIsOpen(false)
  }
  
  const settingDates = (startDate, endDate) => {
    setStartDate(startDate)
    setEndDate(endDate)
    closeCalendar()
  }
  
  const openCalendar = (e) =>{
    if(e.target.id) setCalendarIsOpen(true)
  }


  return(
    <React.Fragment>
      {loading ? "loading" : (
        <React.Fragment>
          <Row className="m-2 mt-4">
              <RoundedBttn className="ml-4" onClick={changeViewToDisplay()}><ArrowLeftShort size={30}></ArrowLeftShort></RoundedBttn>
          </Row>
          <Row className="row justify-content-center p-3">
            <Col xs={12} lg={6} md={6} className="col-6 d-inline-flex flex-column justify-content-center">
              <h2>{renderingSpace.title}</h2>  {!edit && <Button onClick={()=> setShowModalInventory(true)} >Reserve this space!!</Button>}
              <PhotosAdministrator className =" position-relative">
                {edit ? <EditButton onClick={()=>setShowModal(true)} className="z-index-3"></EditButton> : null}
              </PhotosAdministrator>
              <ModalInventory finalDate={endDate} initialDate={startDate} space={renderingSpace} show={showModalInventory} onHide={()=>setShowModalInventory(false)} ></ModalInventory>
              <PhotosEditor show={showModal} onHide={()=>setShowModal(false)}  space={renderingSpace} ></PhotosEditor>
              <GeneralInfoAdministrator space ={renderingSpace} edit={edit}></GeneralInfoAdministrator>
            </Col>
            <Col xs={12} lg={6} md={6} className="col-6 d-relative flex-column justify-content-center">
              <Container className={`text-center mt-2 ${edit? "sticky-top": ""}`}  onClick={(e) => openCalendar(e)} >
                <Calendar
                space={renderingSpace} 
                startDate={startDate}
                endDate={endDate}
                settingDates = {settingDates}
                closeCalendar = {closeCalendar}
                ></Calendar>
              </Container>
              {calendarIsOpen && <div style={{height:370}}></div>}
              {edit ? null : (<PriceAdministrator
                space={renderingSpace} 
                startDate={startDate}
                endDate={endDate}
                setShowModalInventory={setShowModalInventory}
              >
              </PriceAdministrator>)}
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