import React from "react"
import { Row, Col, Button } from 'react-bootstrap';
import Spaces from '../viewSpaces/Spaces';

export default function MainView ({error, spaces, displayMoreInfo}) {
    return (
        <React.Fragment>
            <Row className="row justify-content-center p-3">
              <Col className="col-6 d-inline-flex flex-column justify-content-center">
                <h2 style={{textAlign:"center"}}>your Spaces</h2>
                <Button className="btn btn-primary">Create a new Space</Button>
              </Col>
            </Row>
            <Row>
              <Col>
                {error && <h2>{error.response.data}</h2>}
              <Spaces spaces = {spaces} infoFunction={displayMoreInfo}></Spaces>
              </Col>
            </Row>
          </React.Fragment>
    )
}