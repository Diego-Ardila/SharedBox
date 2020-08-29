import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { Form, Col, Button, Container } from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';
import { useSelector, useDispatch } from "react-redux"
import Spaces from '../components/viewSpaces/Spaces';
import queryString from 'query-string';
import SearchForm from './SearchForm';
import { changeRendering } from '../actions/searchForm.actions';

const Home = () => {
  const dispatch = useDispatch()
  const  spaces = useSelector(state => state.viewSpacesReducer.spaces)
  const area = useSelector(state => state.searchFormReducer.area)
  const location = useSelector(state => state.searchFormReducer.location)
  const initialDate = useSelector(state => state.searchFormReducer.initialDate)
  const finalDate = useSelector(state => state.searchFormReducer.finalDate)


  let range = 15

  const history = useHistory();  
  let queryStr = "";  

  const handleSubmit = (event) => {
    event.preventDefault();
    let qs = {}
    qs.area =  `${area}-${parseInt(area) + range}`
    qs.location = location.toUpperCase()
    qs.inDate = initialDate
    qs.finDate = finalDate 

    queryStr= queryString.stringify(qs)
    dispatch(changeRendering())
    history.push("/viewSpaces?"+queryStr)
  }

  return (
    <Container>
      <SearchForm onSubmit={handleSubmit} />
      
    <h3>Best Rated Locations</h3>
    <Spaces spaces={spaces}  />
    
    </Container>
      
  );
};

export default Home;