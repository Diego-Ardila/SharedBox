import React, {useState} from "react"
import { Row, Col } from 'react-bootstrap';
import PhotosAdministrator from './PhotosAdministrator';
import EditButton from "./EditButton";
import GeneralInfoAdministrator from "./GeneralInfoAdministrator";
import PhotosEditor from "./photosEditor"

export default function SpecificSpaceView ({spaces, spaceId}){
    const [showModal,setShowModal] = useState(false)
    const renderingSpace = spaces.find( space => space._id === spaceId)
    
    return(
        <React.Fragment>
            <Row className="row justify-content-center p-3">
              <Col xs={12} lg={6} md={6} className="col-6 d-inline-flex flex-column justify-content-center">
                <h2>{renderingSpace.title}</h2>
                <PhotosAdministrator className =" position-relative" space={renderingSpace}>
                  <EditButton onClick={()=>setShowModal(true)} className="z-index-3"></EditButton>
                  <PhotosEditor show={showModal} onHide={()=>setShowModal(false)}  spaceId={spaceId} ></PhotosEditor>
                </PhotosAdministrator>
                <GeneralInfoAdministrator space ={renderingSpace}></GeneralInfoAdministrator>
              </Col>
              <Col xs={12} lg={6} md={6} className="col-6 d-inline-flex flex-column justify-content-center">
                <h1>calendar</h1>
                <h1>QA</h1>
              </Col>
            </Row>
          </React.Fragment>
    )
}