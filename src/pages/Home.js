  import React, { useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import {  Container } from 'react-bootstrap';
import { useSelector, useDispatch } from "react-redux"
import Spaces from '../components/viewSpaces/Spaces';
import queryString from 'query-string';
import SearchForm from './SearchForm';
import SearchAdvancedForms from './SearchAdvancedForm';
import { changeRendering } from '../actions/searchForm.actions'
import  changeSpaces  from '../actions/viewSpaces.actions'
import { getFilterSpaces} from '../utils/HTTPrequests'
import swal from 'sweetalert'


const Home = () => {

  let queryStr = "";  
  const dispatch = useDispatch();
  const history = useHistory();  
  const locationQuery = useLocation();
  const spaces = useSelector(state => state.viewSpacesReducer.spaces);
  const search = useSelector(state => state.searchFormReducer);
  const {area, location, initialDate, finalDate, height, width, length, pricePerDay, pricePerMonth, specificSearch, rendering} = search; 
  
  
  useEffect(()=>{
    async function getspaces () {
      try{
        const spaces = await getFilterSpaces(locationQuery.search)
        dispatch(changeSpaces(spaces || []))
      }
      catch(err){
        swal("upss something is wrong", "something went wrong, please try again", "error")
      }
    }
    getspaces()
  },[rendering])
  
   const handleSubmit = () => {
      let qs = {}
        qs.area =  `${area}-1600`
        qs.location = location.toUpperCase()
        qs.inDate = initialDate
        qs.finDate = finalDate 
        dispatch(changeSpaces([]))
      if (specificSearch) {
        qs.height= `${height}-20`
        qs.width= `${width}-40`
        qs.length= `${length}-40`
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