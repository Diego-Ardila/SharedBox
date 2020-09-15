import React from 'react'
import {Button, Container, Card, Row } from 'react-bootstrap'
import {useHistory} from 'react-router-dom'

export default function AdminTenantView (){
    const history = useHistory()
    return(
        <Container className="p-3">
            <Card className="p-3">
                <Row className="justify-content-center">
                    <Button data-testid="lender_admin-button" className="col-lg-5 m-3 " onClick={()=>history.push("/user/profile")} >Personal Information</Button>
                    <Button data-testid="lender_admin-button" className="col-lg-5 m-3">History Transactions</Button>
                </Row>
                <Row className="justify-content-center">
                    <Button data-testid="lender_admin-button" className="col-lg-5 m-3">Scores</Button>
                    <Button data-testid="lender_admin-button" className="col-lg-5 m-3">Incoming reservations</Button>
                </Row>
            </Card>
        </Container>
    )
}