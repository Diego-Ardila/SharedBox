import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { Form, Col, Button, Container } from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';
import { useSelector, useDispatch } from "react-redux"
import Spaces from '../components/viewSpaces/Spaces';
import queryString from 'query-string';
import SearchForm from './SearchForm';
import SearchAdvancedForms from './SearchAdvancedForm';
import axios from 'axios';
import { changeRendering, changeSpecificSearch } from '../actions/searchForm.actions'
import  changeSpaces  from '../actions/viewSpaces.actions'


const Home = () => {

  let queryStr = "";  
  const dispatch = useDispatch();
  const history = useHistory();  
  const locationQuery = useLocation();
  const spaces = useSelector(state => state.viewSpacesReducer.spaces);
  const search = useSelector(state => state.searchFormReducer);
  const {area, location, initialDate, finalDate, height, width, length, pricePerDay, pricePerMonth, specificSearch, rendering} = search; 
  const params = queryString.parse(locationQuery.search)
  let range = 15

  useEffect(() => {
     dispatch(changeRendering())
    if(Object.keys(params).length > 0){
      dispatch(changeSpecificSearch(true))
    }
  },[])

  useEffect(()=>{
    if(params){
      axios({
        method: "GET",
        url: `http://localhost:8000/space/tenant?${locationQuery.search}`
      })
      .then(({data}) => { dispatch(changeSpaces(data || []))} )
      .catch(err=> console.log(err))
    }
  },[rendering])
  

  
  const handleSubmit = () => {
      let qs = {}
        qs.area =  `${area}-${parseInt(area) + range}`
        qs.location = location.toUpperCase()
        qs.inDate = initialDate
        qs.finDate = finalDate 
        dispatch(changeSpaces([]))
      if (specificSearch) {
        qs.height= `${height}-${parseInt(height) + range}`
        qs.width= `${width}-${parseInt(width) + range}`
        qs.length= `${length}-${parseInt(length)+ range}`
        qs.pricePerDay= pricePerDay
        qs.pricePerMonth= pricePerMonth
      }           
      queryStr= queryString.stringify(qs)
      history.push("/home?"+queryStr)
      dispatch(changeRendering())
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