import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { Form, Col, Button, Container } from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';
import { useSelector } from "react-redux"
import Spaces from '../components/viewSpaces/Spaces';
import queryString from 'query-string';
import SearchForm from './SearchForm';
import SearchAdvancedForms from './SearchAdvancedForm';


const Home = () => {
  
  const spaces = useSelector(state => state.viewSpacesReducer.spaces)
  const search = useSelector(state => state.searchFormReducer)
  let range = 15
  
  const history = useHistory();  
  let queryStr = "";  
  
  const handleSubmit = () => {
      const {area, location, initialDate, finalDate, height, width, length, pricePerDay, pricePerMonth, specificSearch} = search 
      let qs = {}
              qs.area =  `${area}-${parseInt(area) + range}`
              qs.location = location.toUpperCase()
              qs.inDate = initialDate
              qs.finDate = finalDate 
      if (specificSearch) {
        qs.height= height
        qs.width= width
        qs.length= length
        qs.pricePerDay= pricePerDay
        qs.pricePerMonth= pricePerMonth
      }           
      queryStr= queryString.stringify(qs)
      history.push("/home?"+queryStr)
  }  

  return (
    <Container>
      <SearchForm showButton={search.specificSearch} onSubmit={handleSubmit} />
      {search.specificSearch && <SearchAdvancedForms onSubmit={handleSubmit} />}
      <h3>Best Rated Locations</h3>
    <Spaces spaces={spaces}  />
    
    </Container>
      
  );
};

export default Home;