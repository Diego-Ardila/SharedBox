import React from "react"
import {useDispatch, useSelector} from "react-redux"
import {Container, Form, Row,  Button} from 'react-bootstrap'
import {ArrowLeft} from 'react-bootstrap-icons';
import {changePublishAreaView,
    changeCity,
    changeAddress} from "../../actions/publishArea.actions"
import { Formik } from 'formik';
import * as Yup from "yup";

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
            <Container>    
                <Row className="justify-content-center">
                    <h1>Register Location</h1>         
                </Row>
                <Row md={{span: 4, offset: 4}} lg={{span: 4, offset: 4}}>
                    <Button variant="primary" size="lg" onClick={redirectBack}>
                        <ArrowLeft />
                    </Button>
                </Row>
                <Row className="justify-content-center">                    
                    <Form className="justify-content-center mt-3" onSubmit={handleSubmit} noValidate>
                        <h3>Now let's talk about the location:</h3>
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
                        <Button variant="primary" size="lg" type="submit">
                            Next
                        </Button>
                    </Form>        
                </Row>                     
            </Container>
            </>
        )}           
        </Formik>
        
    )
}