import React from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import {Question} from 'react-bootstrap-icons'
import {Col, Button, Container, Form, Card, Row, Popover, OverlayTrigger} from "react-bootstrap"

export default function InvetoryUpdateForm({handleUpdateElement,element}){
      
    
    const validatorForm = Yup.object().shape({
        object : Yup.string().required("Required Field"),
        description : Yup.string().max(200,"maximum 200 characters").required("Required Field"),
        category : Yup.string().required("Required Field"),
        value : Yup.number().min(1,"requiered average minimun 1 "),
        quantity: Yup.number().min(1,"requiered minimun 1 object")
    })

return(  
    <Container> 
        <Formik initialValues={{id:element._id, object : element.object ,description : element.description, quantity : element.quantity ,category : element.category, value:element.value}} onSubmit={handleUpdateElement} validationSchema={validatorForm} enableReinitialize={true}>
            {({handleSubmit,handleChange,values,errors,touched,})=>(
                <Form onSubmit={handleSubmit} >
                    <Card className = "justify-content-center p-3">
                        <Form.Row  className="justify-content-center">
                            <Col >
                                <Form.Group>
                                    <OverlayTrigger placement="right"
                                        overlay={
                                        <Popover>
                                            <Popover.Title as="h3">Object</Popover.Title>
                                            <Popover.Content>
                                                <Row className="m-3">
                                                    In this field write the object
                                                </Row>
                                                <Row className="m-3">
                                                <strong className="mr-2">Example: </strong> Books.
                                                </Row>
                                            </Popover.Content>
                                        </Popover>
                                    }>
                                        <Form.Label>Object <Question/></Form.Label>
                                    </OverlayTrigger> 
                                    <Form.Control  name="object" type="text" value={values.object}  onChange = {handleChange} className={touched.object && errors.object ? "is-invalid" : null} />
                                    {touched.object && errors.object ? (
                                        <div className="error-message">{errors.object}</div>
                                    ): null}
                                </Form.Group>
                            </Col>
                            <Col  >
                                <Form.Group>
                                    <OverlayTrigger placement="right"
                                            overlay={
                                            <Popover>
                                                <Popover.Title as="h3">Quantity</Popover.Title>
                                                <Popover.Content>
                                                    <Row className="m-3">
                                                        In this field write the quantity of elements
                                                    </Row>
                                                    <Row className="m-3">
                                                    <strong className="mr-2">Example: </strong> 10.
                                                    </Row>
                                                </Popover.Content>
                                            </Popover>
                                        }>
                                            <Form.Label>Quantity <Question/></Form.Label>
                                    </OverlayTrigger>
                                    <Form.Control name="quantity" type="number" value={values.quantity} onChange = {handleChange} className={touched.quantity && errors.quantity ? "is-invalid" : null}/>
                                    {touched.quantity && errors.quantity ? (
                                        <div className="error-message">{errors.quantity}</div>
                                    ): null}
                                </Form.Group>
                            </Col>
                        </Form.Row>
                        <Form.Row  className="justify-content-left">   
                            <Col>
                                <Form.Group>
                                <OverlayTrigger placement="right"
                                            overlay={
                                            <Popover>
                                                <Popover.Title as="h3">Quantity</Popover.Title>
                                                <Popover.Content>
                                                    <Row className="m-3">
                                                        In this field select category of elements
                                                    </Row>
                                                    <Row className="m-3">
                                                    <strong className="mr-2">Example: </strong> Books.
                                                    </Row>
                                                </Popover.Content>
                                            </Popover>
                                        }>
                                            <Form.Label>Category <Question/></Form.Label>
                                    </OverlayTrigger>
                                    <Form.Control as="select" name="category"  value={values.category} onChange = {handleChange} className={touched.category && errors.category ? "is-invalid" : null} >
                                    <option> </option>
                                    <option>arts and crafts</option>
                                    <option>automobile</option>
                                    <option>books</option>
                                    <option>computers</option>
                                    <option>electronics</option>
                                    <option>home and Kitchen</option>
                                    <option>apparels and clothing</option>
                                    <option>Industrial</option>
                                    <option>Sport elements</option>
                                    <option>Tools and Home repair</option>
                                    <option>Furniture</option>
                                    <option>Toys and Games</option>
                                    <option>Jewels and  luxury</option>
                                    </Form.Control>
                                    {touched.category && errors.category ? (
                                        <div className="error-message">{errors.category}</div>
                                    ): null}
                                </Form.Group>
                            </Col>
                            <Col >
                                <Form.Group>
                                <OverlayTrigger placement="right"
                                            overlay={
                                            <Popover>
                                                <Popover.Title as="h3">Value</Popover.Title>
                                                <Popover.Content>
                                                    <Row className="m-3">
                                                        In this field write the values of objects
                                                    </Row>
                                                    <Row className="m-3">
                                                    <strong className="mr-2">Example: </strong> 1000.
                                                    </Row>
                                                </Popover.Content>
                                            </Popover>
                                        }>
                                            <Form.Label>Value <Question/></Form.Label>
                                    </OverlayTrigger>
                                    <Form.Control name="value" type="number" value={values.value} onChange = {handleChange} className={touched.value && errors.value ? "is-invalid" : null} />
                                    {touched.value && errors.value ? (
                                        <div className="error-message">{errors.value}</div>
                                    ): null}
                                </Form.Group>
                            </Col>
                        </Form.Row>
                        <Form.Row>
                            <Col>                   
                                <Form.Group>
                                <OverlayTrigger placement="right"
                                            overlay={
                                            <Popover>
                                                <Popover.Title as="h3">Description</Popover.Title>
                                                <Popover.Content>
                                                    <Row className="m-3">
                                                        In this field write a small description of objects <strong className="ml-2">maximum 200 characters</strong>
                                                    </Row>
                                                    <Row className="m-3">
                                                    <strong className="mr-2">Example: </strong> it is books reds.
                                                    </Row>
                                                </Popover.Content>
                                            </Popover>
                                        }>
                                            <Form.Label>Description <Question/></Form.Label>
                                    </OverlayTrigger>
                                    <Form.Control name="description" as="textarea" value={values.description} onChange = {handleChange} className={touched.description && errors.description ? "is-invalid" : null} />
                                    {touched.description && errors.description ? (
                                        <div className="error-message">{errors.description}</div>
                                    ): null}
                                </Form.Group>
                            </Col>
                        </Form.Row>
                        <Button type = "submit" className="col-lg-4 m-2" variant={"primary"}>update</Button>
                    </Card>
                </Form>
            )}
        </Formik>
    </Container> 
)
}