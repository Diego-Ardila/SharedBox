import React from 'react'
import {Button, Container, Card, Row } from 'react-bootstrap'
import {useHistory} from 'react-router-dom'
import SpecificSpaceView from '../lenderAdminArea/specificSpaceView';

export default function AdminTenantView (){
    const history = useHistory()
    return(
        <Container className="p-3">
            <Card className="p-3">
                <Row className="justify-content-center">
                    <Button className="col-lg-5 m-3 " onClick={()=>history.push("/user/profile")} >Personal Information</Button>
                    <Button className="col-lg-5 m-3" onClick={() => history.push("/tenant/spaces?state=current") }>History Transactions</Button>
                </Row>
                <Row className="justify-content-center">
                    <Button className="col-lg-5 m-3">Scores</Button>
                    <Button className="col-lg-5 m-3" onClick= {()=>history.push("/tenant/reservations")}>Incoming reservations</Button>
                </Row>
            </Card>
        </Container>
    )
}