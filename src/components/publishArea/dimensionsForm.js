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
import "./dimensionsForm.css"


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
                    <h4>Register Dimensions</h4>         
                </Row>
                <Row className="justify-content-center">
                    <Form className="d-flex flex-column justify-content-center mt-3 p-3" onSubmit={handleSubmit} noValidate>
                        <h6>Tell us a little more about your space:</h6>
                        <div controlId={base.widthId}>
                            <label>Width</label>
                            <div id="FormContainer">
                                <span id="rangeValue">{(values.width || 0) + ' mts'}</span>
                                <input className="range" name="width" min={0} max={40} type="range" onChange ={handleChange} value ={values.width} />
                                {touched.width && errors.width ? (
                                <div className="error-message">{errors.width}</div>
                                ): null}
                            </div>
                        </div>
                        <div controlId={base.widthId}>
                            <label>Length</label>
                            <div id="FormContainer">
                                <span id="rangeValue">{(values.length || 0) + ' mts'}</span>
                                <input className="range" name="length" min={0} max={40} type="range" onChange ={handleChange} value ={values.length} />
                                {touched.length && errors.length ? (
                                <div className="error-message">{errors.length}</div>
                                ): null}
                            </div>
                        </div>
                        <div controlId={base.widthId}>
                            <label>Heigth</label>
                            <div id="FormContainer">
                                <span id="rangeValue">{(values.height || 0) + ' mts'}</span>
                                <input className="range" name="height" min={0} max={10} type="range" onChange ={handleChange} value ={values.height} />
                                {touched.height && errors.height ? (
                                <div className="error-message">{errors.height}</div>
                                ): null}
                            </div>
                        </div>
                        <Button className='button-next' variant="primary" size="md" type="submit">
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
