import React from "react"
import { useSelector, useDispatch } from "react-redux"
import {Container, Form, Row, Badge, Button} from 'react-bootstrap'
import {changeArea,
    changeLength,
    changeHeight,
    changeWidth,
    changePublishAreaView} from "../../actions/publishArea.actions"
import { Formik } from 'formik';
import * as Yup from "yup";    


const base = {
    widthId: "width",
    lengthId: "length",
    heightId: "height",
    pricePerDayId: "pricePerDay",
    spaceTagsId: "spaceTags",
    
    additionalInfoId: "additionalInfo",
    formClass : "space_form",
    submitId : "space_submit"
}

const FormSchema = Yup.object().shape({  
    width: Yup.number().typeError('Value must be a number').required("Required Field").min(1,"Value must be greater than 1").max(200),
    length: Yup.number().typeError('Value must be a number').required("Required Field").min(1,"Value must be greater than 1").max(200),
    height: Yup.number().typeError('Value must be a number').required("Required Field").min(0.1,"Value must be greater than 0.1").max(10)
})

export default function BasicSpaceInfo (){    
    const width = useSelector(state => state.publishAreaReducer.width)
    const length = useSelector(state => state.publishAreaReducer.length)
    const height = useSelector(state => state.publishAreaReducer.height)
    const dispatch = useDispatch()

    const handleSubmit = (values) => {
        const {width, length, height} = values;
        const area = width * length
        dispatch(changeArea(area))
        dispatch(changeWidth(width))
        dispatch(changeHeight(height))
        dispatch(changeLength(length))
        dispatch(changePublishAreaView(2))
        localStorage.setItem("viewState1",JSON.stringify({width, length, height}))
    }
    
    const HandleChange = (action, input) => {
        return e => dispatch(action(input.current.value))  
    }

    return(
        <Formik 
        initialValues = {{height:height, width: width, length: length}}
        validationSchema = {FormSchema}
        onSubmit = {handleSubmit} >   
        {({
        handleSubmit, handleChange, handleBlur, values, touched, isValid, errors, setValues
        }) => (  
            <>            
            <Container>    
                <Row className="justify-content-center">
                    <h1>Register Dimensions</h1>         
                </Row>
                <Row className="justify-content-center">
                    <Form className="justify-content-center mt-3" onSubmit={handleSubmit} noValidate>
                        <h3>Tell us a little more about your space:</h3>
                        <Form.Group controlId={base.widthId}>
                            <Form.Label>Width</Form.Label>
                            <Form.Control name="width" min={0} max={200} type="range" onChange ={handleChange} value ={values.width} />
                            <Badge pill variant="primary">
                            {values.width || 0}
                            </Badge>{' '}
                            {touched.width && errors.width ? (
                            <div className="error-message">{errors.width}</div>
                            ): null}
                        </Form.Group>
                        <Form.Group controlId={base.lengthId}>
                            <Form.Label>Length</Form.Label>
                            <Form.Control name="length" min={0} max={200} type="range" onChange ={handleChange} value ={values.length} />
                            <Badge pill variant="primary">
                            {values.length || 0}
                            </Badge>{'mts '}
                            {touched.length && errors.length ? (
                            <div className="error-message">{errors.length}</div>
                            ): null}
                        </Form.Group>
                        <Form.Group controlId={base.heightId}>
                            <Form.Label>Height</Form.Label>
                            <Form.Control name="height" min={0} max={10} step={0.1}type="range" onChange ={handleChange} value ={values.height} />
                            <Badge pill variant="primary">
                            {values.height || 0}
                            </Badge>{' '}
                            {touched.height && errors.height ? (
                            <div className="error-message">{errors.height}</div>
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
