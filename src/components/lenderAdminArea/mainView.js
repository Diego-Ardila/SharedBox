import React from "react"
import { Row, Col, Button } from 'react-bootstrap';
import Spaces from '../viewSpaces/Spaces';
import {useHistory} from "react-router-dom"

export default function MainView ({error, spaces, displayMoreInfo}) {
  const history = useHistory()  
  return (
        <React.Fragment>
            <Row className="row justify-content-center p-3">
              <Col className="col-6 d-inline-flex flex-column justify-content-center">
                <h2 style={{textAlign:"center"}}>your Spaces</h2>
                <Button className="btn btn-primary" onClick={ (e) => history.push("/lender/createSpace")}>Create a new Space</Button>
              </Col>
            </Row>
            <Row>
              <Col>
                {/* Crear un swal para el error */}
              <Spaces spaces = {spaces} infoFunction={displayMoreInfo}></Spaces>
              </Col>
            </Row>
          </React.Fragment>
    )
}