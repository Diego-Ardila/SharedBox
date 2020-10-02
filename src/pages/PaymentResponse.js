import React, { useEffect, useState } from "react"
import { useLocation, useHistory } from "react-router-dom"
import swal from "sweetalert"
import {getFilterSpaces, GetPaymentInfoByReference, updateNotification, updateUserReservedSpaces} from "../utils/HTTPrequests"
import { Container, Row, Col, Card, Button } from "react-bootstrap"
import "./PaymentResponse.css"
import PayButton from "../components/notification/payButton"
import Space from "../components/viewSpaces/Space"



export default function PaymentResponse () {
    const location = useLocation()
    const history = useHistory()
    const [response, setResponse] = useState({})
    const [loading, setLoading] = useState(true)
    const [spaces, setSpaces] = useState([])
    const [reference] = location.search.substr(1).split("&").map( param => param.split("=")[1])

    const infoFunction = () =>{
        history.push(`/space?_id=${response.x_extra4}&${response.x_extra2.split(" ")[2]}&${response.x_extra3.split(" ")[2]}`)
    }

    const buttonsToDisplay = (codResponse)=>{
        if(codResponse === 1) return <Button variant="primary" onClick={() => history.push("/home")}>Go back home</Button>
        if(codResponse === 2 || codResponse === 4) return <PayButton
                            className="col-lg-3 ml-auto" 
                            block={true}  
                            finalPrice={response.x_ammount}
                            tax={response.x_tax}
                            tax_base={response.ammount_base}
                            spaceTitle={response.x_description}
                            tenantName={response.x_extra5}
                            tenantPhoneNum={response.x_extra6}
                            numDays={response.x_extra1.split("").pop()}
                            inDate={response.x_extra2.split(" ")[2]}
                            finDate={response.x_extra3.split(" ")[2]}
                            tenantId={response.x_id_invoice.split("-")[0]}
                            spaceId={response.x_extra4}/>
        if(codResponse === 3) return <Button variant="primary" onClick={() => history.push(`/response${location.search}`)}>retry now</Button>
    }

    useEffect( () =>{
        const getResponse = async () => {
            try{                
                const response = await GetPaymentInfoByReference(reference)
                const newSpaces = await getFilterSpaces(`?_id:${response.data.data.x_extra4}`)
                const spaceObj = {}
                spaceObj.reservedSpaces = response.data.data.x_extra4  
                const id = await updateUserReservedSpaces(localStorage.getItem("typeUser"),spaceObj)
                await updateNotification('paid',response.data.data.x_extra6)
                setSpaces(newSpaces)
                setResponse(response.data.data)
                setLoading(false)
            }catch(err){
                swal("Ups something went wrong",
                    "looks like we were unable to connect. Please checkout your internet connection and try again",
                    "error")
            }  
        }
        getResponse()
    },[])

    return (
        <React.Fragment>
            {loading ? <h1>loading</h1> : (
                <Container className="response ">
                    <Row className ="justify-content-md-center m-0">
                        <Col className="p-0 text-center">
                            <Card id="accepted" className="text-center response_card">
                                <Card.Header className="response_card">{`transacción ${response.x_response}`} </Card.Header>
                                <Card.Body>
                                    <Card.Title>{response.x_description}</Card.Title>
                                    <Card.Text>
                                        {response.x_extra1} days
                                    </Card.Text>
                                    <Card.Text>
                                        {response.x_extra2}
                                    </Card.Text>
                                    <Card.Text>
                                        {response.x_extra3}
                                    </Card.Text>
                                    {buttonsToDisplay(response.x_cod_response)}
                                </Card.Body>
                                <Card.Footer className="text-muted response_card">{response.x_transaction_date}</Card.Footer>
                            </Card>
                            <Space space={spaces[0]} infoFunction={()=> infoFunction}></Space>
                        </Col>
                    </Row>
                </Container>
                ) 
            }
        </React.Fragment>
    )
}