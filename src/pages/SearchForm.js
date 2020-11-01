import React from 'react';
import { Form, Col, Button} from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';
import { useSelector, useDispatch } from "react-redux";
import { Formik } from 'formik';
import * as Yup from "yup";
import { changeKeyword, 
  changeArea, 
  changeLocation, 
  changeInitialDate, 
  changeFinalDate, 
  changeSpecificSearch} from '../actions/searchForm.actions';
const base = {
  keywordId: "home-keyword",
  areaId: "home-area",
  locationId: "home-location",
  initialDateId: "home-initial-date",
  finalDateId: "home-final-date"
}

const SearchForm = (props) => {

  const dispatch = useDispatch()
  
  const handleGeneralSubmit = (values, errors) => {
    dispatch(changeSpecificSearch(true));
    props.onSubmit()
  }

  const customChange= (eventTarget, setValues, values, dispatch) =>{
    let action
    switch(eventTarget.name) {
      case "keyword" :
        action = changeKeyword
        break
      case "area" :
        action = changeArea
        break
      case "location" :
        action = changeLocation
        break
      case "initialDate" :
        action = changeInitialDate
        break
      case "finalDate" :
        action = changeFinalDate
        break
      default : 
        action = " "
    }
    let toUpdate = {...values}
    toUpdate[eventTarget.name] = eventTarget.value
    dispatch(action(eventTarget.value))
    setValues(toUpdate)
  }

  const formSchema = Yup.object().shape({
    keyword: Yup.string(),
    area: Yup.number().typeError('Value must be a number').required("Required Field"),
    location: Yup.string().required("Required Field"),
    initialDate: Yup.date().required("Required Field"),
    finalDate: Yup.date().min(
      Yup.ref('initialDate'), "Final Date can't be before Initial Date"
    ).required("Required Field")    
  })

  const keyword = useSelector(state => state.searchFormReducer.keyword)
  const area = useSelector(state => state.searchFormReducer.area)
  const location = useSelector(state => state.searchFormReducer.location)
  const initialDate = useSelector(state => state.searchFormReducer.initialDate)
  const finalDate = useSelector(state => state.searchFormReducer.finalDate)

  return (
    <Formik
      initialValues={{ keyword, area, location, initialDate ,finalDate}}
      validationSchema={formSchema}
      onSubmit={handleGeneralSubmit}>     
    {({
      handleSubmit, handleChange, handleBlur, values, touched, isValid, errors, setValues

    }) => (
      <Form className="row justify-content-center mt-3" onSubmit={handleSubmit}  noValidate >
        <Form.Row lg={10} sm={12} className="ml-2 mr-2">
          <Col sm={4} >
            <Form.Group controlId={base.keywordId}>
              <Form.Label>Keyword</Form.Label>
              <Form.Control className={touched.keyword && errors.keyword ? "is-invalid" : null} name="keyword" type="text" placeholder="keyword" onChange ={(e) => customChange(e.target, setValues, values, dispatch) } value={values.keyword} />
              {touched.keyword && errors.keyword ? (
                <div className="error-message">{errors.keyword}</div>
              ): null}
            </Form.Group>
          </Col>
          <Col sm={4} >
            <Form.Group controlId={base.areaId}>
              <Form.Label>Min Area</Form.Label>
              <Form.Control name="area" type="text" placeholder="Enter Area" onChange ={(e) => customChange(e.target , setValues, values, dispatch) } value={values.area} className={touched.area && errors.area ? "is-invalid" : null}  />
              {touched.area && errors.area ? (
                <div className="error-message">{errors.area}</div>
              ): null}
            </Form.Group>            
          </Col>          
          <Col sm={4} >
            <Form.Group controlId={base.locationId}>
              <Form.Label>Location</Form.Label>
              <Form.Control className={touched.location && errors.location ? "is-invalid" : null} name="location" type="text" placeholder="Location" onChange ={(e) => customChange(e.target, setValues, values, dispatch) } value={values.location} />
              {touched.location && errors.location ? (
                <div className="error-message">{errors.location}</div>
              ): null}
            </Form.Group>
          </Col>
          <Col sm={4} >
            <Form.Group controlId={base.initialDateId}>
              <Form.Label>Initial Date</Form.Label>
              <Form.Control type="date" placeholder="Initial Date" name="initialDate" onChange ={(e) => customChange(e.target , setValues, values, dispatch) } value={values.initialDate} className={touched.initialDate && errors.initialDate ? "is-invalid" : null}  />
              {touched.initialDate && errors.initialDate ? (
                <div className="error-message">{errors.initialDate}</div>
              ): null}
            </Form.Group>
          </Col>
          <Col sm={4} >
            <Form.Group controlId={base.finalDateId}>
              <Form.Label>Final Date</Form.Label>
              <Form.Control type="date" placeholder="Final Date" name="finalDate" onChange ={(e) => customChange(e.target , setValues, values, dispatch) } value={values.finalDate} className={touched.finalDate && errors.finalDate ? "is-invalid" : null} />
              {touched.finalDate && errors.finalDate ? (
                <div className="error-message">{errors.finalDate}</div>
              ): null}
            </Form.Group>            
          </Col> 
          <Button style={props.showButton ? {display:"none"} : {}} variant="primary" size="lg" type="submit">
          <Search />
          </Button>          
         
        </Form.Row>
      </Form>    
    )} 
    </Formik>    
  );
};

export default SearchForm
