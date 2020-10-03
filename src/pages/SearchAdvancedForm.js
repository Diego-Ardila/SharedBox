import React from 'react';
import { Form, Col, Button, Badge} from 'react-bootstrap';
import {X} from 'react-bootstrap-icons'
import { Search } from 'react-bootstrap-icons';
import { useDispatch, useSelector } from "react-redux";
import { changeHeight, changeWidth, changeLength, changeTags, changePricePerDay, changePricePerMonth } from '../actions/searchForm.actions';
import { Formik, Field } from 'formik';
import * as Yup from "yup";


const base = {
  heightId: "view-height",
  widthId: "view-width",
  lengthId: "view-length",
  tagsId: "view-tags",
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

  const handleKeyDown = (e, setFieldValue) => {
    if (["Enter", "Tab", ","].includes(e.key)) {
      e.preventDefault();
      let tag = {};
      var value = e.target.value.trim();
      if (value){
        tag['name'] = value;      
        const newTags = [].concat(tags, {id: tags.length + 1, ...tag });
        dispatch(changeTags(newTags));
        setFieldValue("tags","")
      }
    }
  };
  
  const handleDelete = item => {
    const newTags = tags.filter(elem => elem.id !== item)
    dispatch(changeTags(newTags))
  };

  const handlePaste = e => {
    e.preventDefault();
    var paste = e.clipboardData.getData("text");  
    let tag = {};
      var value = paste.trim();
      if (value){
        tag['name'] = value;      
        const newTags = [].concat(tags, {id: tags.length + 1, ...tag });
        dispatch(changeTags(newTags));
      }
  };

  const FormSchema = Yup.object().shape({
    pricePerDay: Yup.number().typeError('Value must be a number'),
    pricePerMonth: Yup.number().typeError('Value must be a number')    
  })
  

  const height = useSelector(state => state.searchFormReducer.height)
  const width = useSelector(state => state.searchFormReducer.width)
  const length = useSelector(state => state.searchFormReducer.length)
  const tags = useSelector(state => state.searchFormReducer.tags)
  
  
  return (
    <Formik 
      initialValues = {{tags: tags, height:height, width: width, length: length}}
      validationSchema = {FormSchema}
      onSubmit = {handleInternalSubmit} >
    {({
      handleSubmit, handleChange, handleBlur, values, touched, isValid, errors, setValues
    }) => (
        <Form className="row justify-content-center mt-3" onSubmit={handleSubmit} noValidate>
          <Form.Row className="col-lg-12">
            <Col sm={2} >
              <Form.Group controlId={base.heightId}>
                <Form.Label>Min Height</Form.Label>
                <Form.Control name="height" min={0} max={10} type="range" onChange ={(e) => customChange(e.target,setValues,values,dispatch)} value ={values.height} />
                <Badge pill variant="primary">
                  {values.height || 0}
                </Badge>{' '}
              </Form.Group>
            </Col>
            <Col sm={2}>
              <Form.Group controlId={base.widthId}>
                <Form.Label>Min Width</Form.Label>
                <Form.Control name= "width" min={0} max={40} type="range" onChange ={(e) => customChange(e.target,setValues,values,dispatch)} value ={values.width} />
                <Badge pill variant="primary">
                  {values.width || 0}
                </Badge>{' '}
              </Form.Group>
            </Col>
            <Col sm={2}>
              <Form.Group controlId={base.lengthId}>
                <Form.Label>Min Length</Form.Label>
                <Form.Control name= "length" min={0} max={40} type="range" onChange ={(e) => customChange(e.target,setValues,values,dispatch)} value ={values.length} />
                <Badge pill variant="primary">
                  {values.length || 0}
                </Badge>{' '}
              </Form.Group>
            </Col>
            <Col>
              <Field name="tags" type="text" id="tags">
                {({ field: {value}, form: {handleChange, setFieldValue} }) => (
                  <>                  
                  <Form.Group controlId={base.tagsId}>
                    <Form.Label>Tags</Form.Label>
                    <Form.Row>
                    {tags && tags.length > 0 ? tags.map(item => (                     
                      <Col>
                        <div key={item.id}>
                          <Badge variant="info">
                            <h6>{item.name}</h6>
                            <Button size="sm" onClick={() => handleDelete(item.id)}><X size={10} /></Button>
                          </Badge>
                        </div>
                      </Col>                 
                     )) : null} 
                    </Form.Row>
                    <Form.Control name = "tags" type="text" className={"input " + (errors.tags && " has-error")} value={values.tags} placeholder="Type tags" onKeyDown={(e) => handleKeyDown(e,setFieldValue)} onChange={handleChange}onPaste={handlePaste} />                  
                  </Form.Group>            
                  </>
                )}              
              </Field> 
            </Col>
            <Col sm={2}>
              <Form.Group controlId={base.pricePerDayId}>
              <Form.Label> Max Price per Day</Form.Label>
              <Form.Control name = "pricePerDay" type="text" placeholder="Price per Day" onChange ={(e) => customChange(e.target,setValues,values,dispatch)} value ={values.pricePerDay} className={touched.pricePerDay && errors.pricePerDay ? "is-invalid" : null} />
              {touched.pricePerDay && errors.pricePerDay ? (
                <div className="error-message">{errors.pricePerDay}</div>
              ): null}
              </Form.Group>
            </Col>
            <Col sm={2}>
              <Form.Group controlId={base.pricePerMonthId}>
              <Form.Label> Max Price per Month</Form.Label>
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