import React from "react"
import {useDispatch, useSelector} from "react-redux"
import {Container, Form, Row,  Button} from 'react-bootstrap'
import {ArrowLeft, Display} from 'react-bootstrap-icons';
import {changePublishAreaView,
    changeCity,
    changeAddress} from "../../actions/publishArea.actions"
import { Formik } from 'formik';
import * as Yup from "yup";
import "./LocationForm.scss"

const base =  {
    locationCityId: "locationCity",
    locationAddressId: "locationAddress",
    formClass : "locationForm"
}

const FormSchema = Yup.object().shape({  
    city: Yup.string().required("Required Field"),
    address: Yup.string().required("Required Field")
})
export default function LocationForm () {

    const dispatch = useDispatch()
    
    const city= useSelector(state => state.publishAreaReducer.city)
    const address = useSelector(state => state.publishAreaReducer.address)
    
    const handleSubmit = values => {
        const { city,address} = values
        dispatch(changeCity(city))
        dispatch(changeAddress(address))
        dispatch(changePublishAreaView(3))
    } 
    const redirectBack = () => dispatch(changePublishAreaView(1))

    return(
        <Formik 
        initialValues = {{city, address}}
        validationSchema = {FormSchema}
        onSubmit = {handleSubmit} >   
        {({
        handleSubmit, handleChange, handleBlur, values, touched, isValid, errors, setValues
        }) => (  
            <>            
            <Container className="p-3">   
                <Row className="justify-content-center">
                    <h4>Register Location</h4>         
                </Row>
                <Row className="justify-content-center">                    
                    <Form className="d-grid justify-content-center mt-3" onSubmit={handleSubmit} noValidate>
                        <div className="location-form-div">
                            <div className="location-form">
                                <h6>Now let's talk about the location:</h6>
                                <Form.Group controlId={base.locationCityId}>
                                    <Form.Label>City</Form.Label>
                                    <Form.Control className={touched.city && errors.city ? "is-invalid" : null} name="city" type="text" placeholder="Enter City" onChange ={handleChange} value={values.city} />
                                    {touched.city && errors.city ? (
                                        <div className="error-message">{errors.city}</div>
                                    ): null}
                                </Form.Group>
                                <Form.Group controlId={base.locationAddressId}>
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control className={touched.address && errors.address ? "is-invalid" : null} name="address" type="text" placeholder="Enter Address" onChange ={handleChange} value={values.address} />
                                    {touched.address && errors.address ? (
                                        <div className="error-message">{errors.address}</div>
                                    ): null}
                                </Form.Group> 
                            </div>
                                <Button className="form-btn-last" variant="primary" size="lg" onClick={redirectBack}>
                                    <ArrowLeft />
                                </Button>                        
                                <Button className="form-btn-next" variant="primary" size="lg" type="submit">
                                    Next
                                </Button>
                        </div>
                    </Form>        
                </Row>                     
            </Container>
            </>
        )}           
        </Formik>
        
    )
}