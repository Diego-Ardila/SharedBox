import React, {useState} from "react"
import { Row, Col } from 'react-bootstrap';
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

const RoundedBttn = styled.button`
    cursor: pointer;
    color: #fff;
    background-color: #007bff;
    border-color: #007bff;
    z-index:1040;
`



export default function SpecificSpaceView ({spaces, spaceId, changeViewToDisplay, edit}){  
  const dispatch = useDispatch()
    const [showModal,setShowModal] = useState(false)
    const [loading, setLoading] = useState(true)
    const renderingSpace = spaces.find( space => space._id === spaceId)
    
    useEffect(()=>{
      dispatch(changePhotos(renderingSpace.photos))
      setLoading(false)
    },[])
    
    
    
    return(
      <React.Fragment>
        {loading ? "loading" : (
          <React.Fragment>
            <Row>
                <RoundedBttn className="ml-4" onClick={changeViewToDisplay()}><ArrowLeftShort size={30}></ArrowLeftShort></RoundedBttn>
            </Row>
            <Row className="row justify-content-center p-3">
              <Col xs={12} lg={6} md={6} className="col-6 d-inline-flex flex-column justify-content-center">
                <h2>{renderingSpace.title}</h2>
                <PhotosAdministrator className =" position-relative">
                  {edit ? <EditButton onClick={()=>setShowModal(true)} className="z-index-3"></EditButton> : null}
                </PhotosAdministrator>
                <PhotosEditor show={showModal} onHide={()=>setShowModal(false)}  space={renderingSpace} ></PhotosEditor>
                <GeneralInfoAdministrator space ={renderingSpace} edit={edit}></GeneralInfoAdministrator>
              </Col>
              <Col xs={12} lg={6} md={6} className="col-6 d-inline-flex flex-column justify-content-center">
                <h1>calendar</h1>
              </Col>
              </Row>
              <Row className="row justify-content-center p-3">
                <Col className="col-12 d-inline-flex flex-column justify-content-center">
                  <FAQadministrator space={renderingSpace}></FAQadministrator>
                </Col>
              </Row>
            </React.Fragment>
        )}
      </React.Fragment>
  )
}