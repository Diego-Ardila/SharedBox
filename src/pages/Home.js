import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { Form, Col, Button, Container } from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';
import Spaces from './Spaces';
import axios from 'axios';
import queryString from 'query-string';

let spaces = [
  {
    id: 1,
    name: "Parqueadero",
    images : ["https://images.unsplash.com/photo-1485217988980-11786ced9454?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80","https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80","https://images.unsplash.com/photo-1522204523234-8729aa6e3d5f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"],
    area : 50,
    width: 10,
    length: 5,
    height: 5,
    city: "Barranquilla",
    address: "Calle 79#59-43",
    spaceTags: ["Primero","Segundo","Tercero"]
  },{
    id: 2,
    name: "Parqueadero 2 ",
    images : ["https://images.unsplash.com/photo-1563986768817-257bf91c5753?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=785&q=80","https://images.unsplash.com/photo-1588091209794-8aa1768e2937?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=348&q=80","https://images.unsplash.com/photo-1585144860131-245d551c77f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=521&q=80"],
    area : 100,
    width: 20,
    length: 10,
    height: 10,
    city: "Bogotá",
    address: "Calle 51#29-43",
    spaceTags: ["Cuarto","Quinto","Sexto"]
  }
]

const base = {
  areaId: "home-area",
  locationId: "home-location",
  initialDateId: "home-initial-date",
  finalDateId: "home-final-date"
}

const Home = () => {
  let [ area, setArea] = useState("");
  let [ location, setLocation] = useState("");
  let [ initialDate, setInitialDate] = useState(new Date());
  let [ finalDate, setFinalDate] = useState(new Date());

  const locationQuery = useLocation();
  const history = useHistory();  
  let queryStr = "";

  const areaInput = useRef();
  const locationInput = useRef();
  const initialDateInput = useRef();
  const finalDateInput = useRef();


  const handleChange = (event) => {
    if(event.target.id === base.areaId ){
      setArea(area = event.target.value)
    }   
    if(event.target.id === base.locationId ){
      setLocation(location = event.target.value)
    }  
    if(event.target.id === base.initialDateId ){
      setInitialDate(initialDate = event.target.value)
    }  
    if(event.target.id === base.finalDateId ){
      setFinalDate(finalDate = event.target.value)
    }  
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    let qs = {}
    let newArea = parseInt(area) + 15
    qs.area =  `${area}-${newArea}`
    qs.location = location.toUpperCase()
    qs.inDate = initialDate
    qs.finDate = finalDate 
    queryStr= queryString.stringify(qs)
    locationQuery.search= queryStr
    history.push("/viewSpaces?"+queryStr)
  }

  return (
    <Container>
    <Form className="row justify-content-center mt-3" onSubmit={handleSubmit}>
      <Form.Row className="col-lg-10">
        <Col >
          <Form.Group controlId={base.areaId}>
            <Form.Label>Area</Form.Label>
            <Form.Control ref={areaInput} type="text" placeholder="Enter Area" onChange ={handleChange} />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId={base.locationId}>
            <Form.Label>Location</Form.Label>
            <Form.Control ref={locationInput} type="text" placeholder="Location" onChange ={handleChange} />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId={base.initialDateId}>
            <Form.Label>Initial Date</Form.Label>
            <Form.Control ref={initialDateInput} type="date" placeholder="Initial Date" onChange ={handleChange} />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId={base.finalDateId}>
          <Form.Label>Final Date</Form.Label>
          <Form.Control ref={finalDateInput} type="date" placeholder="Final Date" onChange ={handleChange} />
          </Form.Group>
        </Col>
        <Button variant="primary" size="lg" type="submit">
          <Search />
        </Button>{' '}
      </Form.Row>
    </Form>
    <h3>Best Rated Locations</h3>
    <Spaces spaces={spaces}  />
    
    </Container>
      
  );
};

export default Home;