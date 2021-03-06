import React from "react"
import TagManager from "./tagsManager"
import {useSelector, useDispatch} from "react-redux"
import { changeDescription, changePublishAreaView, changeTitle } from "../../actions/publishArea.actions"
import { Container, Row,  Form, Button } from "react-bootstrap"
import {ArrowLeft} from 'react-bootstrap-icons';
import { Formik } from "formik";
import * as Yup from "yup"; 
import "./descriptionForm.js"

const FormSchema = Yup.object().shape({  
    additionalInfo: Yup.string()
    .required("Required Field")
    .min(10,"Your description must be at least 10 characters")
    .max(200, "Your description cannot be longer than 200 characters"),
    title: Yup.string()
    .required("Required field")
    .min(10, "Your title should be at least 10 characters")
    .max(100, "Your title cannot be longer than 100 characters")
})

export default function DescriptionForm () {
    
    const dispatch = useDispatch()
    const additionalInfo = useSelector(state => state.publishAreaReducer.additionalInfo)
    const title = useSelector(state => state.publishAreaReducer.title)
    
    const handleSubmit = (values) => {
        dispatch(changeDescription(values.additionalInfo))
        dispatch(changeTitle(values.title))
        dispatch(changePublishAreaView(4))
    }

    const redirectBack = () => dispatch(changePublishAreaView(2))

    return (
        <Formik
            initialValues= {{additionalInfo, title}}
            onSubmit = {handleSubmit}
            validationSchema = {FormSchema}
        >
        {({
        handleSubmit, handleChange, handleBlur, values, touched, isValid, errors, setValues
            }) => ( 
                <Container>
                    <Form onSubmit = {handleSubmit} noValidate>
                        <Row className="justify-content-center">    
                            <h4>
                                <p className="text-center">Register description</p>
                            </h4>
                        </Row>
                        <Row className="justify-content-center">
                            <h6>
                                <p className="text-center">Add some tags for your space</p>
                            </h6>
                        </Row>
                        <Row className="justify-content-center">
                            <TagManager></TagManager>
                        </Row>
                        <Row className="justify-content-center">
                            <Form.Group controlId="title">
                                <Form.Label>Title</Form.Label>
                                <Form.Control name="title" type="text" placeholder="Enter your title"  value={values.title} onChange ={handleChange} />
                                {touched.title && errors.title ? (
                                <div className="error-message">{errors.title}</div>
                            ): null}
                            </Form.Group>
                        </Row>
                        <Row className="justify-content-center">
                            <Form.Group controlId="additionalInfo">
                                <Form.Label>Additional Information</Form.Label>
                                <Form.Control name="additionalInfo" type="textarea" placeholder="Enter your additional information"  value={values.additionalInfo} onChange ={handleChange} />
                                
                                {touched.additionalInfo && errors.additionalInfo ? (
                                <div className="error-message">{errors.additionalInfo}</div>
                            ): null}
                            </Form.Group>                                
                        </Row>
                        <Row className="justify-content-center">
                            <div style={{display:"flex", width:203.6}}>
                            <Button style={{width:"50%"}}variant="primary" size="lg" onClick={redirectBack}>
                                <ArrowLeft />
                            </Button>
                            <Button style={{width:"50%"}} variant="primary" size="md" type="submit">
                                Next
                            </Button>
                            </div>
                        </Row>
                    </Form>
                </Container>
            )
        }
        </Formik>
    )
}