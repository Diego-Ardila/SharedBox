import React from "react"
import { Row, Col } from 'react-bootstrap';
import PhotosAdministrator from './PhotosAdministrator';
import EditButton from "./EditButton";
import GeneralInfoAdministrator from "./GeneralInfoAdministrator";

export default function SpecificSpaceView ({spaces, spaceId}){
    const renderingSpace = spaces.find( space => space._id === spaceId)
    
    return(
        <React.Fragment>
            <Row className="row justify-content-center p-3">
              <Col xs={12} lg={6} md={6} className="col-6 d-inline-flex flex-column justify-content-center">
                <h2>{renderingSpace.title}</h2>
                <PhotosAdministrator className =" position-relative" space={renderingSpace}>
                  <EditButton className="z-index-3"></EditButton>
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