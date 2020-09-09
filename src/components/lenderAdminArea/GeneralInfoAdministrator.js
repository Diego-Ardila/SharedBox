import React, {useState} from "react"
import {Card, Button, Accordion, Badge, Form} from "react-bootstrap"
import { Pencil } from "react-bootstrap-icons"
import { Formik } from "formik"
import { updateSpace } from "../../utils/HTTPrequests";
import swal from 'sweetalert';

export default function GeneralInfoAdministrator ({space, edit}) {
    const [isUpdatingState, setIsUpdatingState] = useState(false)
    
    const handleSubmit = async values => {
        try{
            await updateSpace(space._id, values)
            swal("udpate successful","your changes to your space were saved succesfully","success")
        }catch(error){
            swal("update error", "something went wrong, please try again", "error")
        }
    }

    const buttonBehavior = () => {
        setIsUpdatingState(!isUpdatingState)
    }
    const eventKeyUpdatingState = "0"

    return (
        <Formik
        initialValues = {{...space}}
        onSubmit = {handleSubmit}
        >
        {({
        handleSubmit, handleChange, handleBlur, values, touched, isValid, errors, setValues
        }) => (
            <Form onSubmit={handleSubmit}>
                <Card className="text-center">
                    <Card.Header>INFORMATION</Card.Header>
                    <Card.Body>
                    <Card.Title><Form.Label>SPACE DESCRIPTION</Form.Label></Card.Title>
                    <Card.Text>
                        {isUpdatingState ? (
                        <Form.Control 
                            name="additionalInfo" 
                            type="textArea" 
                            placeholder={values.additionalInfo || "i am a testing test"}
                            value={values.additionalInfo}
                            onChange={handleChange}    
                        />
                        ) : values.additionalInfo || "I am a testing text"}
                    </Card.Text>
                    <Accordion defaultActiveKey={isUpdatingState ? "0" : ""}>
                        <Card>
                            <Card.Header>
                            <Accordion.Toggle as={Card.Header} variant="text" eventKey={isUpdatingState ? eventKeyUpdatingState : "0"}>
                                <h6>DIMENSIONS</h6>
                            </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey={isUpdatingState ? eventKeyUpdatingState : "0"}>
                            <Card.Body>
                                {isUpdatingState ? (
                                    <React.Fragment>
                                        <Form.Label>WIDTH</Form.Label>
                                        <Form.Control 
                                        name="width" 
                                        type="text" 
                                        placeholder={values.width}
                                        value={values.width}
                                        onChange={handleChange}    
                                        />
                                        <Form.Label>LENGTH</Form.Label>
                                        <Form.Control 
                                        name="length" 
                                        type="text" 
                                        placeholder={values.length}
                                        value={values.length}
                                        onChange={handleChange}    
                                        />
                                        <Form.Label>HEIGHT</Form.Label>
                                        <Form.Control 
                                        name="height" 
                                        type="text" 
                                        placeholder={values.height}
                                        value={values.height}
                                        onChange={handleChange}    
                                        />
                                    </React.Fragment>
                                ) : `width: ${values.width}mts length: ${values.length}mts height: ${values.height}mts `} 
                            </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        <Card>
                            <Card.Header>
                            <Accordion.Toggle as={Card.Header} variant="text" eventKey={isUpdatingState ? eventKeyUpdatingState : "1"}>
                                <h6>PRICES</h6>
                            </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey={isUpdatingState ? eventKeyUpdatingState : "1"}>
                            <Card.Body>
                            {isUpdatingState ? (
                                    <React.Fragment>
                                        <Form.Label>PRICE PER DAY</Form.Label>
                                        <Form.Control 
                                        name="pricePerDay" 
                                        type="number" 
                                        placeholder={values.pricePerDay}
                                        value={values.pricePerDay}
                                        onChange={handleChange}    
                                        />
                                        <Form.Label>PRICE PER MONTH</Form.Label>
                                        <Form.Control 
                                        name="pricePermonth" 
                                        type="number" 
                                        placeholder={values.pricePermonth}
                                        value={values.pricePermonth}
                                        onChange={handleChange}    
                                        />
                                    </React.Fragment>
                                ) : `price per day: ${values.pricePerDay} price per month: ${values.pricePermonth}` }
                            </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        <Card>
                            <Card.Header>
                            <Accordion.Toggle as={Card.Header} variant="text" eventKey={isUpdatingState ? eventKeyUpdatingState : "2"}>
                                <h6>TAGS</h6>
                            </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey={isUpdatingState ? eventKeyUpdatingState : "2"}>
                            <Card.Body>
                                {space.spaceTags.map(({name}) => <Badge variant="secondary">{name}</Badge>)}
                            </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        <Card>
                            <Card.Header>
                            <Accordion.Toggle as={Card.Header} variant="text" eventKey={isUpdatingState ? eventKeyUpdatingState : "3"}>
                                <h6>LOCATION</h6>
                            </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey={isUpdatingState ? eventKeyUpdatingState : "3"}>
                            <Card.Body>
                            {isUpdatingState ? (
                                    <React.Fragment>
                                        <Form.Label>CITY</Form.Label>
                                        <Form.Control 
                                        name="city" 
                                        type="text" 
                                        placeholder={values.city}
                                        value={values.city}
                                        onChange={handleChange}    
                                        />
                                        <Form.Label>ADDRESS</Form.Label>
                                        <Form.Control 
                                        name="address" 
                                        type="text" 
                                        placeholder={values.address}
                                        value={values.address}
                                        onChange={handleChange}    
                                        />
                                    </React.Fragment>
                                ) : `city: ${values.city} address: ${values.address}` }
                            </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        </Accordion>
                    {edit ? <Button  type={isUpdatingState ? "" : "submit"} className="mt-4" variant="primary" onClick={(e) => buttonBehavior()} >{isUpdatingState? "save" : "edit"}<Pencil></Pencil></Button> : null}
                    </Card.Body>
                    <Card.Footer className="text-muted">{`created ${Date(space.createdAt)}`}</Card.Footer>
                </Card>
            </Form>
        )}
        </Formik>
    )
}