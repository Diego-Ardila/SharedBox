import React, {useState} from "react"
import { Row, Col, Button } from 'react-bootstrap';
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

const RoundedBttn = styled.button`
    cursor: pointer;
    color: #fff;
    background-color: #007bff;
    border-color: #007bff;
    z-index:1040;
`

export default function SpecificSpaceView ({spaces, spaceId, changeViewToDisplay, edit}){  
  const dispatch = useDispatch()
    const [showModalEdit,setShowModalEdit] = useState(false)
    const [showModalInventory,setShowModalInventory] = useState(false)
    const [loading, setLoading] = useState(true)
    const [editFAQ, setEditFAQ] = useState(false)
    const renderingSpace = spaces.find( space => space._id === spaceId)
    
    useEffect(()=>{
      dispatch(changePhotos(renderingSpace.photos))
      setLoading(false)
    },[])
    
    const hideEditFAQ = () => {
      setEditFAQ(false)
    }
    
    return(
      <React.Fragment>
        {loading ? "loading" : (
          <React.Fragment>
            <Row>
                <RoundedBttn className="ml-4" onClick={changeViewToDisplay()}><ArrowLeftShort size={30}></ArrowLeftShort></RoundedBttn>
            </Row>
            <Row className="row justify-content-center p-3">
              <Col xs={12} lg={6} md={6} className="col-6 d-inline-flex flex-column justify-content-center">
                <h2>{renderingSpace.title}</h2> {!edit && <Button onClick={()=> setShowModalInventory(true)} >Inventory</Button>}
                <PhotosAdministrator className =" position-relative" >
                  {edit ? <EditButton onClick={()=>setShowModalEdit(true)} className="z-index-3"></EditButton> : null}
                </PhotosAdministrator>
                <ModalInventory show={showModalInventory} onHide={()=>setShowModalInventory(false)} ></ModalInventory>
                <PhotosEditor show={showModalEdit} onHide={()=>setShowModalEdit(false)}  space={renderingSpace} ></PhotosEditor>
                <GeneralInfoAdministrator space ={renderingSpace} edit={edit}></GeneralInfoAdministrator>
              </Col>
              <Col xs={12} lg={6} md={6} className="col-6 d-inline-flex flex-column justify-content-center">
                <h1>calendar</h1>
              </Col>
              </Row>
              <Row className="row justify-content-center p-3">
                <Col className="col-12 d-inline-flex flex-column justify-content-center">
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