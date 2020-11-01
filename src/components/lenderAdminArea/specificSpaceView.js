import React, { useState } from "react"
import { Row, Col, Button, Container, Badge, Spinner } from 'react-bootstrap';
import PhotosAdministrator from './PhotosAdministrator';
import EditButton from "./EditButton";
import GeneralInfoAdministrator from "./GeneralInfoAdministrator";
import PhotosEditor from "./photosEditor"    
import { ArrowLeftShort } from "react-bootstrap-icons"
import styled from "styled-components"
import {useDispatch, useSelector} from 'react-redux'
import {changePhotos} from '../../actions/publishArea.actions'
import { useEffect } from "react";
import FAQadministrator from "./FAQadminstrator";
import FrequentAskedQuestions from "../../pages/frequentAsked";
import ModalInventory from "../Inventory/inventoryModal"
import Calendar from "../viewSpaces/calendar";
import PriceAdministrator from "./PriceAdministrator";
import { useLocation, useHistory } from "react-router-dom";
import moment from "moment"
import {getFilterSpaces} from '../../utils/HTTPrequests'
import InventoryCheck from "./InventoryCheck";
import swal from "sweetalert";

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
  const isLogged = useSelector(state => state.loginUserReducer.isLogged)
  const [showModal,setShowModal] = useState(false)
  const [showModalInventory,setShowModalInventory] = useState(false)
  const [loading, setLoading] = useState(true)
  const [editFAQ, setEditFAQ] = useState(false)
  const [startDate, setStartDate] = useState(edit ? null : moment(locationQuery.search.slice(40,50),"YYYY-MM-DD"))
  const [endDate, setEndDate] = useState(edit ? null : moment(locationQuery.search.slice(59),"YYYY-MM-DD"))
  const [calendarIsOpen, setCalendarIsOpen] = useState(false)
  const [renderingSpace, setRenderingSpace] = useState(spaces.find( space => space._id === spaceId))

  let history = useHistory();
  
  useEffect(()=>{
    dispatch(changePhotos(renderingSpace.photos))
    setLoading(false)
  },[])

  useEffect(()=>{
    setRenderingSpace(spaces.find( space => space._id === spaceId))
  },[spaces])
  
  const hideEditFAQ = () => {
    setEditFAQ(false)
  }

  const updateRenderingSpace = async () => {  
    let newSpace = await getFilterSpaces(`?_id=${spaceId}`)
    setRenderingSpace(newSpace[0])
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

  const reservedDates = isLogged ? <>
    <h4> Your reservations:</h4>      
      {renderingSpace.dateReservedId && renderingSpace.dateReservedId.length > 0 ? renderingSpace.dateReservedId.map(elem => <>    
        <Row className="justify-content-center mb-2">
          <h4><Badge variant="info">{moment(elem.initialDate).format("DD MMM YYYY")}</Badge></h4><h4>-</h4>
          <h4><Badge variant="info">{moment(elem.finalDate).format("DD MMM YYYY")}</Badge></h4>
        </Row>    
      </>
      ) 
    : <h6>There are no reservations for this place</h6>}</> 
  : null;
  return(
    <React.Fragment>
      {loading ? <Spinner /> : (
        <React.Fragment>
          <Row className="mb-2">
              <Button className="ml-4" onClick={changeViewToDisplay()()}><ArrowLeftShort size={30}></ArrowLeftShort></Button>
          </Row>
          <Row className="row justify-content-center p-3">
            <Col xs={12} lg={6} md={6} className="col-6 justify-content-center">
              <div style={{alignSelf:"start"}}>
                <h4>{renderingSpace.title}</h4>  {!edit && <Button block={true} onClick={()=> { isLogged ?
                setShowModalInventory(true) 
                : swal("Denied Access", "Please login as a tenant user for reserve spaces", "error").then((value) => history.push("/user/login") )  }} >Reserve this space!!</Button>}
                <PhotosAdministrator className =" position-relative">
                  {edit ? <EditButton onClick={()=>setShowModal(true)} className="z-index-3"></EditButton> : null}
                </PhotosAdministrator>
                <ModalInventory finalDate={endDate} initialDate={startDate} space={renderingSpace} show={showModalInventory} onHide={()=>setShowModalInventory(false)} updateSpace={updateRenderingSpace} ></ModalInventory>
                <PhotosEditor show={showModal} onHide={()=>setShowModal(false)}  space={renderingSpace} ></PhotosEditor>
                <GeneralInfoAdministrator space ={renderingSpace} edit={edit}></GeneralInfoAdministrator>
              </div>
            </Col>
            <Col xs={12} lg={6} md={6} className="col-6 d-relative flex-column text-center justify-content-center">
              <Container className={`text-center mt-2`}  onClick={(e) => openCalendar(e)} >
                {reservedDates}
                <Calendar
                space={renderingSpace} 
                startDate={startDate}
                endDate={endDate}
                settingDates = {settingDates}
                closeCalendar = {closeCalendar}
                ></Calendar>
              </Container>
              {calendarIsOpen && <div style={{height:370}}></div>}
              {edit ?
              <InventoryCheck
                space={renderingSpace}
              ></InventoryCheck> : 
               (<PriceAdministrator
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
                {( renderingSpace.faqs.length > 0) ? <FAQadministrator space={renderingSpace}></FAQadministrator> : null }
                  
                  {edit && <Button onClick = {() => setEditFAQ(true) }>Add FAQ questions</Button>}
                </Col>
              </Row>
              <Row>
                <Col className="col-12 d-inline-flex flex-column justify-content-center">
                  {editFAQ && <FrequentAskedQuestions setEditFAQ ={hideEditFAQ} spaceId ={spaceId} createdFaq={updateRenderingSpace}></FrequentAskedQuestions>}
                </Col>
              </Row>
            </React.Fragment>
        )}
      </React.Fragment>
  )
}