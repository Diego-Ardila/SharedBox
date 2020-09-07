import React, { useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import {  Container } from 'react-bootstrap';
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
  
  useEffect(()=>{
    if(params){
      axios({
        method: "GET",
        baseURL: `http://localhost:4000/space/tenant`,
        url: `${locationQuery.search}`
      })
      .then(({data}) => { dispatch(changeSpaces(data || []))} )
      .catch(err=> console.log(err))
    }
  },[rendering])
  
  const handleSubmit = () => {
      let qs = {}
        qs.area = `${parseInt(area) - parseInt(area)}-${area}`
        qs.location = location.toUpperCase()
        qs.inDate = initialDate
        qs.finDate = finalDate 
        dispatch(changeSpaces([]))
      if (specificSearch) {
        qs.height= `${parseInt(height) - parseInt(height)}-${height}`
        qs.width= `${parseInt(width) - parseInt(width)}-${width}`
        qs.length= `${parseInt(length)-parseInt(length)}-${length}`
        qs.pricePerDay= pricePerDay
        qs.pricePerMonth= pricePerMonth
      }           
      queryStr= queryString.stringify(qs)
      history.push("/home?"+queryStr)
      dispatch(changeRendering())
  }  

  const infoFunction = () => {
  
  }
  return (
    <Container>
      <SearchForm showButton={search.specificSearch} onSubmit={handleSubmit} />
        {search.specificSearch && <SearchAdvancedForms onSubmit={handleSubmit} />}
        <h3>Best Rated Locations</h3>
      <Spaces spaces={spaces} infoFunction={infoFunction} />
    </Container>
      
  );
};

export default Home;