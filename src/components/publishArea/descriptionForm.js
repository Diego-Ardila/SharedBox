import React from "react"
import TagManager from "./tagsManager"
import {useSelector, useDispatch} from "react-redux"
import { changeDescription, changePublishAreaView, changeTitle } from "../../actions/publishArea.actions"
import { Container, Row, Col, Form, Button } from "react-bootstrap"
import { Formik } from "formik"
import * as Yup from "yup"; 

const FormSchema = Yup.object().shape({  
    additionalInfo: Yup.string()
    .required("Required Field")
    .min(100,"your description must be at least 100 characters")
    .max(200, "your description cannot be longer than 200 characters"),
    title: Yup.string()
    .required("required field")
    .min(10, "your title should be at least 10 characters")
    .max(100, "isn´t to long? your title should")
})

export default function DescriptionForm () {
    
    const dispatch = useDispatch()
    const additionalInfo = useSelector(state => state.publishAreaReducer.textAreaDesc)
    
    const handleSubmit = (values) => {
        dispatch(changeDescription(values.additionalInfo))
        dispatch(changeTitle(values.title))
        dispatch(changePublishAreaView(4))
    }

    return (
        <Formik
            initialValues= {{additionalInfo}}
            onSubmit = {handleSubmit}
            validationSchema = {FormSchema}
        >
        {({
        handleSubmit, handleChange, handleBlur, values, touched, isValid, errors, setValues
            }) => ( 
                <Container>
                    <Form onSubmit = {handleSubmit}>
                        <Row className="justify-content-center">
                            <Col>
                                <h3>Now tell us more about what a tenant could expect:</h3>
                                <h6>add some tags that describes your space! <br></br> it will be easier for tenants to find you<br></br>psst... pro tip, add at least 3</h6>
                                <TagManager></TagManager>
                            </Col>
                        </Row>
                        <Row className="justify-content-center">
                            <h6>give a tittle and a description to your space!</h6>   
                        </Row>
                        <Row className="justify-content-center">
                                <Form.Group controlId="title">
                                <Form.Label>TITLE</Form.Label>
                                <Form.Control name="title" type="text" placeholder="a cool title for your space"  value={values.title} onChange ={handleChange} />
                                <Form.Text className="text-muted">
                                    an appealing title enhance your changes of being selected.
                                </Form.Text>
                                </Form.Group>
                                <Form.Group controlId="additionalInfo">
                                <Form.Label>ADDITIONAL INFO</Form.Label>
                                <Form.Control name="additionalInfo" type="textarea" placeholder="a short description"  value={values.additionalInfo} onChange ={handleChange} />
                                <Form.Text className="text-muted">
                                    this description will be used as keywords for users to find you. You should Think with which words do you want your users to be able to find you. 
                                </Form.Text>
                                </Form.Group>
                                <Button variant="primary" size="lg" type="submit">
                                    Next
                                </Button>
                        </Row>
                    </Form>
                </Container>
            )
        }
        </Formik>
    )
}