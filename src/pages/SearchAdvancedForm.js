import React, { useRef} from 'react';
import { Form, Col, Button, Badge} from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';
import { useDispatch, useSelector } from "react-redux";
import { changeHeight, changeWidth, changeLength, changePricePerDay, changePricePerMonth} from '../actions/searchForm.actions';
import { Formik } from 'formik';
import * as Yup from "yup";


const base = {
  heightId: "view-height",
  widthId: "view-width",
  lengthId: "view-length",
  pricePerDayId: "view-price-day",
  pricePerMonthId: "view-price-month"
}  



const SearchAdvancedForms = (props) => {

  const dispatch = useDispatch()

  const handleInternalSubmit = (values, errors) => {
    props.onSubmit()
  }

  const customChange= (eventTarget, setValues, values, dispatch) =>{
    let action
    switch(eventTarget.name) {
      case "height" :
        action = changeHeight
        break
      case "length" :
        action = changeLength
        break
      case "width" :
        action = changeWidth
        break
      case "pricePerDay" :
        action = changePricePerDay
        break
      case "pricePerMonth" :
        action = changePricePerMonth
        break
      default : 
        action = " "
    }
    let toUpdate = {...values}
    toUpdate[eventTarget.name] = eventTarget.value
    dispatch(action(eventTarget.value))
    setValues(toUpdate)
  }

  const FormSchema = Yup.object().shape({
    pricePerDay: Yup.number().typeError('Value must be a number').required("Required Field"),
    pricePerMonth: Yup.number().typeError('Value must be a number').required("Required Field")    
  })
  

  const height = useSelector(state => state.searchFormReducer.height)
  const width = useSelector(state => state.searchFormReducer.width)
  const length = useSelector(state => state.searchFormReducer.length)
  
  
  return (
    <Formik 
      initialValues = {{height:height, width: width, length: length}}
      validationSchema = {FormSchema}
      onSubmit = {handleInternalSubmit} >
    {({
      handleSubmit, handleChange, handleBlur, values, touched, isValid, errors, setValues
    }) => (
        <Form className="row justify-content-center mt-3" onSubmit={handleSubmit} noValidate>
          <Form.Row className="col-lg-10">
            <Col >
              <Form.Group controlId={base.heightId}>
                <Form.Label>Height</Form.Label>
                <Form.Control name="height" min={0} max={10} type="range" onChange ={(e) => customChange(e.target,setValues,values,dispatch)} value ={values.height} />
                <Badge pill variant="primary">
                  {values.height || 0}
                </Badge>{' '}
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId={base.widthId}>
                <Form.Label>Width</Form.Label>
                <Form.Control name= "width" min={0} max={40} type="range" onChange ={(e) => customChange(e.target,setValues,values,dispatch)} value ={values.width} />
                <Badge pill variant="primary">
                  {values.width || 0}
                </Badge>{' '}
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId={base.lengthId}>
                <Form.Label>Length</Form.Label>
                <Form.Control name= "length" min={0} max={40} type="range" onChange ={(e) => customChange(e.target,setValues,values,dispatch)} value ={values.length} />
                <Badge pill variant="primary">
                  {values.length || 0}
                </Badge>{' '}
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId={base.pricePerDayId}>
              <Form.Label>Price per Day</Form.Label>
              <Form.Control name = "pricePerDay" type="text" placeholder="Price per Day" onChange ={(e) => customChange(e.target,setValues,values,dispatch)} value ={values.pricePerDay} className={touched.pricePerDay && errors.pricePerDay ? "is-invalid" : null} />
              {touched.pricePerDay && errors.pricePerDay ? (
                <div className="error-message">{errors.pricePerDay}</div>
              ): null}
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId={base.pricePerMonthId}>
              <Form.Label>Price per Month</Form.Label>
              <Form.Control name = "pricePerMonth" type="text" placeholder="Price per Month" onChange ={(e) => customChange(e.target,setValues,values,dispatch)} value ={values.pricePerMonth} className={touched.pricePerMonth && errors.pricePerMonth ? "is-invalid" : null}/>
              {touched.pricePerMonth && errors.pricePerMonth ? (
                <div className="error-message">{errors.pricePerMonth}</div>
              ): null}
              </Form.Group>
            </Col>
            <Button variant="primary" size="lg" type="submit">
            <Search />
          </Button>{' '}
          </Form.Row>
        </Form>
    )}
    </Formik>
   
  )
  
}

export default SearchAdvancedForms