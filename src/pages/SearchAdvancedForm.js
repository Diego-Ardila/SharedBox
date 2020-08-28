import React, { useRef} from 'react';
import { Form, Col, Button, Badge} from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';
import { useDispatch, useSelector } from "react-redux";
import { changeHeight, changeWidth, changeLength, changePricePerDay, changePricePerMonth} from '../actions/searchForm.actions';

const base = {
  heightId: "view-height",
  widthId: "view-width",
  lengthId: "view-length",
  pricePerDayId: "view-price-day",
  pricePerMonthId: "view-price-month"
}  

const SearchAdvancedForms = (props) => {
  const dispatch = useDispatch(); 
  
  const heightInput = useRef();
  const widthInput = useRef();
  const lengthInput = useRef();
  const pricePerDayInput = useRef();
  const pricePerMonthInput = useRef();

  const height = useSelector(state => state.searchFormReducer.height)
  const width = useSelector(state => state.searchFormReducer.width)
  const length = useSelector(state => state.searchFormReducer.length)
  const handleChange = (action, input) => {
    return (event) => dispatch(action(input.current.value))
  } 
  return (
    <Form className="row justify-content-center mt-3" >
      <Form.Row className="col-lg-10">
        <Col >
          <Form.Group controlId={base.heightId}>
            <Form.Label>Height</Form.Label>
            <Form.Control ref={heightInput} min={0} max={500} type="range" onChange ={handleChange(changeHeight, heightInput )} />
            <Badge pill variant="primary">
              {height || 0}
            </Badge>{' '}
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId={base.widthId}>
            <Form.Label>Width</Form.Label>
            <Form.Control ref={widthInput} min={0} max={500} type="range" onChange ={handleChange(changeWidth, widthInput )} />
            <Badge pill variant="primary">
              {width || 0}
            </Badge>{' '}
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId={base.lengthId}>
            <Form.Label>Length</Form.Label>
            <Form.Control ref={lengthInput} min={0} max={500} type="range" onChange ={handleChange(changeLength, lengthInput )} />
            <Badge pill variant="primary">
              {length || 0}
            </Badge>{' '}
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId={base.pricePerDayId}>
          <Form.Label>Price per Day</Form.Label>
          <Form.Control ref={pricePerDayInput} type="text" placeholder="Price per Day" onChange ={handleChange(changePricePerDay, pricePerDayInput )} />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId={base.pricePerMonthId}>
          <Form.Label>Price per Month</Form.Label>
          <Form.Control ref={pricePerMonthInput} type="text" placeholder="Price per Month" onChange ={handleChange(changePricePerMonth, pricePerMonthInput )} />
          </Form.Group>
        </Col>
      </Form.Row>
    </Form>
  )
}

export default SearchAdvancedForms