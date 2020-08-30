import React, { useRef} from 'react';
import { Form, Col, Button} from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';
import { useSelector } from "react-redux";
import { Formik } from 'formik';
import * as Yup from "yup";

const base = {
  areaId: "home-area",
  locationId: "home-location",
  initialDateId: "home-initial-date",
  finalDateId: "home-final-date"
}

const SearchForm = (props) => {
  const formSchema = Yup.object().shape({
    area: Yup.number().typeError('Value must be a number').required("Required Field"),
    location: Yup.string().required("Required Field"),
    initialDate: Yup.date().required("Required Field"),
    finalDate: Yup.date().required("Required Field")    
  })
  const area = useSelector(state => state.searchFormReducer.area)
  const location = useSelector(state => state.searchFormReducer.location)
  const initialDate = useSelector(state => state.searchFormReducer.initialDate)
  const finalDate = useSelector(state => state.searchFormReducer.finalDate)

  return (
    <Formik
      initialValues={{ area: area, location: location, initialDate: initialDate,finalDate: finalDate}}
      validationSchema={formSchema}
      onSubmit={props.onSubmit}>     
    {({
      handleSubmit, handleChange, handleBlur, values, touched, isValid, errors,

    }) => (
      <Form className="row justify-content-center mt-3" onSubmit={handleSubmit}  noValidate >
        <Form.Row className="col-lg-10">
          <Col >
            <Form.Group controlId={base.areaId}>
              <Form.Label>Area</Form.Label>
              <Form.Control name="area" type="text" placeholder="Enter Area" onChange ={handleChange} value={values.area} className={touched.area && errors.area ? "is-invalid" : null}  />
              {touched.area && errors.area ? (
                <div className="error-message">{errors.area}</div>
              ): null}
              <Form.Control.Feedback>
                {errors.area}
              </Form.Control.Feedback>
            </Form.Group>            
          </Col>          
          <Col>
            <Form.Group controlId={base.locationId}>
              <Form.Label>Location</Form.Label>
              <Form.Control className={touched.location && errors.location ? "is-invalid" : null} name="location" type="text" placeholder="Location" onChange ={handleChange} value={values.location} />
              {touched.location && errors.location ? (
                <div className="error-message">{errors.location}</div>
              ): null}
              <Form.Control.Feedback>
                {errors.location}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId={base.initialDateId}>
              <Form.Label>Initial Date</Form.Label>
              <Form.Control type="date" placeholder="Initial Date" name="initialDate" onChange ={handleChange} value={values.initialDate} className={touched.initialDate && errors.initialDate ? "is-invalid" : null}  />
              {touched.initialDate && errors.initialDate ? (
                <div className="error-message">{errors.initialDate}</div>
              ): null}
              <Form.Control.Feedback>
                {errors.initialDate}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId={base.finalDateId}>
              <Form.Label>Final Date</Form.Label>
              <Form.Control type="date" placeholder="Final Date" name="finalDate" onChange ={handleChange} value={values.finalDate} className={touched.finalDate && errors.finalDate ? "is-invalid" : null} />
              {touched.finalDate && errors.finalDate ? (
                <div className="error-message">{errors.finalDate}</div>
              ): null}
              <Form.Control.Feedback>
                {errors.finalDate}
              </Form.Control.Feedback>
            </Form.Group>            
          </Col>          
          <Button variant="primary" size="lg" type="submit">
            <Search />
          </Button>{' '}
        </Form.Row>
      </Form>    
    )} 
    </Formik>    
  );
};

export default SearchForm;