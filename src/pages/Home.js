import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { Form, Col, Button, Container } from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';
import { useSelector, useDispatch } from "react-redux"
import Spaces from '../components/viewSpaces/Spaces';
import queryString from 'query-string';
import SearchForm from './SearchForm';
import SearchAdvancedForms from './SearchAdvancedForm';
import { changeArea, 
         changeLocation, 
         changeInitialDate, 
         changeFinalDate, 
         changeRendering, 
         changeSpecificSearch,
         changeWidth, 
         changeHeight, 
         changeLength,
          changePricePerDay,
          changePricePerMonth} from '../actions/searchForm.actions';
import { setNestedObjectValues } from 'formik';

const Home = () => {
  
  const dispatch = useDispatch()
  const  spaces = useSelector(state => state.viewSpacesReducer.spaces)
  const specificSearch = useSelector(state => state.searchFormReducer.specificSearch)
  let range = 15

  const history = useHistory();  
  let queryStr = "";  

  const handleSubmit = ( values, errors) => {
    let{area, location, initialDate, finalDate} = values;
        dispatch(changeArea(area));
        dispatch(changeLocation(location));
        dispatch(changeInitialDate(initialDate));
        dispatch(changeFinalDate(finalDate));
        dispatch(changeSpecificSearch(true));
        dispatch(changeRendering())
        let qs = {}
              qs.area =  `${area}-${parseInt(area) + range}`
              qs.location = location.toUpperCase()
              qs.inDate = initialDate
              qs.finDate = finalDate 
              
              console.log(Object.keys(values).some(key => key === "height"))
      if (Object.keys(values).some(key => key === "height" )) {
        
        const {height,width,length,pricePerDay,pricePerMonth} = values
        dispatch(changeHeight(height));
        dispatch(changeLength(length));
        dispatch(changeWidth(width));
        dispatch(changePricePerDay(pricePerDay));
        dispatch(changePricePerMonth(pricePerMonth));
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
      <SearchForm showButton={!specificSearch} onSubmit={handleSubmit} />
      {specificSearch && <SearchAdvancedForms onSubmit={handleSubmit} />}
      <h3>Best Rated Locations</h3>
    <Spaces spaces={spaces}  />
    
    </Container>
      
  );
};

export default Home;