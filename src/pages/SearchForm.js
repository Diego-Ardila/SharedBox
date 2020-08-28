import React, { useRef} from 'react';
import { Form, Col, Button} from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';
import { useDispatch, useSelector } from "react-redux"
import { changeArea, changeLocation, changeInitialDate, changeFinalDate} from '../actions/searchForm.actions'

const base = {
  areaId: "home-area",
  locationId: "home-location",
  initialDateId: "home-initial-date",
  finalDateId: "home-final-date"
}
const SearchForm = (props) => {
  const dispatch = useDispatch();
  const areaInput = useRef();
  const locationInput = useRef();
  const initialDateInput = useRef();
  const finalDateInput = useRef();

  const area = useSelector(state => state.searchFormReducer.area)
  const location = useSelector(state => state.searchFormReducer.location)
  const initialDate = useSelector(state => state.searchFormReducer.initialDate)
  const finalDate = useSelector(state => state.searchFormReducer.finalDate)

  
  const handleChange = (action, input) => {
    return (event) => dispatch(action(input.current.value))
  }
  return (
    <Form className="row justify-content-center mt-3" onSubmit={props.onSubmit}>
      <Form.Row className="col-lg-10">
        <Col >
          <Form.Group controlId={base.areaId}>
            <Form.Label>Area</Form.Label>
            <Form.Control ref={areaInput} type="text" placeholder="Enter Area" onChange ={handleChange(changeArea, areaInput )} value={area} />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId={base.locationId}>
            <Form.Label>Location</Form.Label>
            <Form.Control ref={locationInput} type="text" placeholder="Location" onChange ={handleChange(changeLocation, locationInput )} value={location} />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId={base.initialDateId}>
            <Form.Label>Initial Date</Form.Label>
            <Form.Control ref={initialDateInput} type="date" placeholder="Initial Date" onChange ={handleChange(changeInitialDate, initialDateInput )} value={initialDate} />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId={base.finalDateId}>
          <Form.Label>Final Date</Form.Label>
          <Form.Control ref={finalDateInput} type="date" placeholder="Final Date" onChange ={handleChange(changeFinalDate, finalDateInput )} value={finalDate} />
          </Form.Group>
        </Col>
        <Button variant="primary" size="lg" type="submit">
          <Search />
        </Button>{' '}
      </Form.Row>
    </Form>
  );
};

export default SearchForm;