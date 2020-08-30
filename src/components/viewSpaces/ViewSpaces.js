import React, {useState,  useEffect} from 'react';
import { Container} from 'react-bootstrap';
import Spaces from './Spaces';
import { useLocation, useHistory } from 'react-router-dom';
import queryString from 'query-string';
import axios from 'axios';
import SearchForm from '../../pages/SearchForm';
import { useSelector, useDispatch} from "react-redux"
import changeSpaces from '../../actions/viewSpaces.actions'
import SearchAdvancedForms from '../../pages/SearchAdvancedForm';
import { changeArea, changeLocation, changeInitialDate, changeFinalDate, changeRendering, changePricePerDay, changePricePerMonth, changeHeight, changeWidth, changeLength} from "../../actions/searchForm.actions"
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

const ViewSpaces = () => {  
  const locationQuery = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  const area = useSelector(state => state.searchFormReducer.area)
  const location = useSelector(state => state.searchFormReducer.location)
  const initialDate = useSelector(state => state.searchFormReducer.initialDate)
  const finalDate = useSelector(state => state.searchFormReducer.finalDate)

  const rendering = useSelector(state => state.searchFormReducer.rendering)
  
  let areaRange = 15
 
  useEffect( () => {
    const params = queryString.parse(locationQuery.search )
    if (params !== {}){
      axios({
        method: "GET",
        url: `http://localhost:4000/space/tenant?${locationQuery.search}`
      })
      .then(({data})=>{
        console.log(data)
       dispatch(changeSpaces(data || []))})
      .catch(err=>console.log(err))
    }  
  }, [rendering]);

  const handleSubmit = (values , errors) => {
    const {height,width,length,pricePerDay,pricePerMonth} = values
    console.log(values)
    let qs = {}
    qs.area =  `${area}-${parseInt(area) + areaRange}`
    qs.location = location.toUpperCase()
    qs.inDate = initialDate
    qs.finDate = finalDate 
    qs.height= height
    qs.width= width
    qs.length= length
    qs.pricePerDay= pricePerDay
    qs.pricePerMonth= pricePerMonth
    let queryStr= queryString.stringify(qs)
    dispatch(changeArea(area));
    dispatch(changeLocation(location));
    dispatch(changeInitialDate(initialDate));
    dispatch(changeFinalDate(finalDate));
    dispatch(changeHeight(height));
    dispatch(changeLength(length));
    dispatch(changeWidth(width));
    dispatch(changePricePerDay(pricePerDay));
    dispatch(changePricePerMonth(pricePerMonth));
    dispatch(changeRendering());

    history.push("/viewSpaces?"+queryStr)
  }

  return (
    <Container>
      <SearchForm showButton={false} />
      <h4>Other Filters:</h4>
      <SearchAdvancedForms onSubmit={handleSubmit} />
      <h5>Results:</h5>
      <Spaces spaces={spaces}/>
    </Container>
  );
};

export default ViewSpaces;
