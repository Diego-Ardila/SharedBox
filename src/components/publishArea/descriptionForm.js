import React from "react"
import TagManager from "./tagsManager"
import {useSelector, useDispatch} from "react-redux"
import { changeDescription, changePublishAreaView, changeTitle } from "../../actions/publishArea.actions"
import { Container, Row,  Form, Button } from "react-bootstrap"
import {ArrowLeft} from 'react-bootstrap-icons';
import { Formik } from "formik"
import * as Yup from "yup"; 

const FormSchema = Yup.object().shape({  
    additionalInfo: Yup.string()
    .required("Required Field")
    .min(10,"your description must be at least 10 characters")
    .max(200, "your description cannot be longer than 200 characters"),
    title: Yup.string()
    .required("required field")
    .min(10, "your title should be at least 10 characters")
    .max(100, "isn´t to long? your title should")
})

export default function DescriptionForm () {
    
    const dispatch = useDispatch()
    const additionalInfo = useSelector(state => state.publishAreaReducer.textAreaDesc)
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
                        <Row md={{span: 4, offset: 4}} lg={{span: 4, offset: 4}}>
                            <Button variant="primary" size="lg" onClick={redirectBack}>
                                <ArrowLeft />
                            </Button>
                        </Row>
                        <Row className="justify-content-center">
                            <h3>
                                <p className="text-center">Now tell us more about what a tenant could expect:
                                </p>
                            </h3>
                            <h6>
                                <p className="text-center">
                                add some tags that describes your space! it will be easier for tenants to find you psst... pro tip, add at least 3
                                </p>
                            </h6>
                            <TagManager></TagManager>
                        </Row>
                        <Row className="justify-content-center">
                            <Form.Group controlId="title">
                                <Form.Label>TITLE</Form.Label>
                                <Form.Control name="title" type="text" placeholder="a cool title for your space"  value={values.title} onChange ={handleChange} />
                                <Form.Text className="text-muted">
                                    an appealing title enhance your changes of being selected.
                                </Form.Text>
                                {touched.title && errors.title ? (
                                <div className="error-message">{errors.title}</div>
                            ): null}
                            </Form.Group>
                            <Form.Group controlId="additionalInfo">
                                <Form.Label>ADDITIONAL INFO</Form.Label>
                                <Form.Control name="additionalInfo" type="textarea" placeholder="a short description"  value={values.additionalInfo} onChange ={handleChange} />
                                <Form.Text className="text-muted">
                                    this description will be used as keywords for users to find you. You should Think with which words do you want your users to be able to find you. 
                                </Form.Text>
                                {touched.additionalInfo && errors.additionalInfo ? (
                                <div className="error-message">{errors.additionalInfo}</div>
                            ): null}
                            </Form.Group>                                
                        </Row>
                        <Row className="justify-content-center">
                            <Button variant="primary" size="md" type="submit">
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