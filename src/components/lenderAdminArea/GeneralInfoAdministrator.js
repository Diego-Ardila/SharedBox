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
            swal("Update successfully","Your changes to your space were saved succesfully","success")
        }catch(error){
            swal("Update error", "Something went wrong, please try again", "error")
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
                    <Card.Header>Information</Card.Header>
                    <Card.Body>
                    <Card.Title><Form.Label>Space Description</Form.Label></Card.Title>
                    <Card.Text>
                        {isUpdatingState ? (
                        <Form.Control 
                            name="additionalInfo" 
                            type="textArea" 
                            placeholder={values.additionalInfo}
                            value={values.additionalInfo}
                            onChange={handleChange}    
                        />
                        ) : values.additionalInfo}
                    </Card.Text>
                    <Accordion defaultActiveKey={isUpdatingState ? "0" : "0"}>
                        <Card>
                            <Card.Header>
                            <Accordion.Toggle as={Card.Header} variant="text" eventKey={isUpdatingState ? eventKeyUpdatingState : "0"}>
                                <h6>Dimensions</h6>
                            </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey={isUpdatingState ? eventKeyUpdatingState : "0"}>
                            <Card.Body>
                                {isUpdatingState ? (
                                    <React.Fragment>
                                        <Form.Label>Width</Form.Label>
                                        <Form.Control 
                                        name="width" 
                                        type="text" 
                                        placeholder={values.width}
                                        value={values.width}
                                        onChange={handleChange}    
                                        />
                                        <Form.Label>Length</Form.Label>
                                        <Form.Control 
                                        name="length" 
                                        type="text" 
                                        placeholder={values.length}
                                        value={values.length}
                                        onChange={handleChange}    
                                        />
                                        <Form.Label>Height</Form.Label>
                                        <Form.Control 
                                        name="height" 
                                        type="text" 
                                        placeholder={values.height}
                                        value={values.height}
                                        onChange={handleChange}    
                                        />
                                    </React.Fragment>
                                ) : ( 
                                    <React.Fragment>
                                        <Card.Text>
                                            {`Area: ${values.area} mts`}
                                        </Card.Text>
                                        <Card.Text>
                                            {`Width: ${values.width} mts`}
                                        </Card.Text>
                                        <Card.Text>
                                            {`Length: ${values.length} mts` }
                                            
                                        </Card.Text>
                                        <Card.Text>
                                            { `Height: ${values.height} mts`} 
                                        </Card.Text>
                                    </React.Fragment>
                                     )
                                }         
                            </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        <Card>
                            <Card.Header>
                            <Accordion.Toggle as={Card.Header} variant="text" eventKey={isUpdatingState ? eventKeyUpdatingState : "1"}>
                                <h6>Prices</h6>
                            </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey={isUpdatingState ? eventKeyUpdatingState : "1"}>
                            <Card.Body>
                            {isUpdatingState ? (
                                    <React.Fragment>
                                        <Form.Label>Price per Day</Form.Label>
                                        <Form.Control 
                                        name="pricePerDay" 
                                        type="number" 
                                        placeholder={values.pricePerDay}
                                        value={values.pricePerDay}
                                        onChange={handleChange}    
                                        />
                                        <Form.Label>Price per Month</Form.Label>
                                        <Form.Control 
                                        name="pricePermonth" 
                                        type="number" 
                                        placeholder={values.pricePermonth}
                                        value={values.pricePermonth}
                                        onChange={handleChange}    
                                        />
                                    </React.Fragment>
                                ) : `Price per Day: ${values.pricePerDay} Price per Month: ${values.pricePermonth}` }
                            </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        <Card>
                            <Card.Header>
                            <Accordion.Toggle as={Card.Header} variant="text" eventKey={isUpdatingState ? eventKeyUpdatingState : "2"}>
                                <h6>Tags</h6>
                            </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey={isUpdatingState ? eventKeyUpdatingState : "2"}>
                            <Card.Body>
                                {space.spaceTags.map(({name}) => <Badge key={name} variant="secondary">{name}</Badge>)}
                            </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        <Card>
                            <Card.Header>
                            <Accordion.Toggle as={Card.Header} variant="text" eventKey={isUpdatingState ? eventKeyUpdatingState : "3"}>
                                <h6>Location</h6>
                            </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey={isUpdatingState ? eventKeyUpdatingState : "3"}>
                            <Card.Body>
                            {isUpdatingState ? (
                                    <React.Fragment>
                                        <Form.Label>City</Form.Label>
                                        <Form.Control 
                                        name="city" 
                                        type="text" 
                                        placeholder={values.city}
                                        value={values.city}
                                        onChange={handleChange}    
                                        />
                                        <Form.Label>Address</Form.Label>
                                        <Form.Control 
                                        name="address" 
                                        type="text" 
                                        placeholder={values.address}
                                        value={values.address}
                                        onChange={handleChange}    
                                        />
                                    </React.Fragment>
                                ) : `City: ${values.city} Address: ${values.address}` }
                            </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        </Accordion>
                    {edit ? <Button  type={isUpdatingState ? "" : "submit"} className="mt-4" variant="primary" onClick={(e) => buttonBehavior()} >{isUpdatingState? "Save" : "Edit"}<Pencil></Pencil></Button> : null}
                    </Card.Body>
                    <Card.Footer className="text-muted">{`Created at: ${Date(space.createdAt)}`}</Card.Footer>
                </Card>
            </Form>
        )}
        </Formik>
    )
}