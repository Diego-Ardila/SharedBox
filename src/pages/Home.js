  import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import {  Container } from 'react-bootstrap';
import { useSelector, useDispatch } from "react-redux"
import Spaces from '../components/viewSpaces/Spaces';
import queryString from 'query-string';
import SearchForm from './SearchForm';
import SearchAdvancedForms from './SearchAdvancedForm';
import { changeRendering } from '../actions/searchForm.actions'
import  changeSpaces  from '../actions/viewSpaces.actions'
import { getFilterSpacesHome } from '../utils/HTTPrequests'
import swal from 'sweetalert'
import Pagination from 'react-bootstrap/Pagination'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'


const Home = () => {

  let queryStr = "";  
  const dispatch = useDispatch();
  const history = useHistory();  
  const locationQuery = useLocation();
  const locationParsed = queryString.parse(locationQuery.search)
  const spaces = useSelector(state => state.viewSpacesReducer.spaces);
  const search = useSelector(state => state.searchFormReducer);
  const {title, area, location, initialDate, finalDate, height, width, length, tags, pricePerDay, pricePerMonth, specificSearch, rendering} = search; 
  let [active, setActive] = useState(1)
  let [items, setItems] = useState([])
  let [limit,setLimit] = useState(10)
  let [total,setTotal] = useState()
  let [message,setMessage] = useState("")
  
  useEffect(()=>{
    async function getspaces () {
      try{
        const response = await getFilterSpacesHome(locationQuery.search)
        dispatch(changeSpaces(response.data || []))
        const maxPages = response.headers["content-pages"]
        const totalItems = response.headers["content-total"]
        setTotal(totalItems)
        let renderTotal = total ? total : totalItems
        let renderLimit = locationParsed.limit ? locationParsed.limit : limit
        let prevActive= parseInt(active)-1
        let firstElement = parseInt(renderLimit*prevActive)
        if(active == 1 && maxPages > 1){
          setMessage(`${active} to ${renderLimit*active} out of ${renderTotal}`)
        }else if(active == maxPages && active != 1){
          setMessage(`${firstElement + 1} to ${renderTotal % renderLimit == 0 ? renderLimit*active : renderTotal % renderLimit + firstElement} out of ${renderTotal}`)
        }else if(maxPages == 1){
          setMessage(`${firstElement + 1} to ${renderTotal % renderLimit == 0 ? renderLimit : renderTotal % renderLimit} out of ${renderTotal}`)
        }else {
          setMessage(`${firstElement + 1} to ${renderLimit*active} out of ${renderTotal}`)
        }
  
        let newItems = []
        for(let i = 1; i <= maxPages; i++){
          newItems.push(
             <Pagination.Item onClick={handlePage(i)} key={i} active={i === active}>{i}</Pagination.Item>
          )
          if(i==maxPages){
            newItems.push(
              <DropdownButton 
              drop= "up"
              title="items per page" 
              size='sm'
              >
                <Dropdown.Item eventKey={5} onSelect= {handleLimit}>5</Dropdown.Item>
                <Dropdown.Item eventKey={10} onSelect={handleLimit}>10</Dropdown.Item>
                <Dropdown.Item eventKey={15} onSelect={handleLimit}>15</Dropdown.Item>
                <Dropdown.Item eventKey={20} onSelect={handleLimit}>20</Dropdown.Item>
                <Dropdown.Item eventKey={25} onSelect={handleLimit}>25</Dropdown.Item>
                <Dropdown.Item eventKey={30} onSelect={handleLimit}>30</Dropdown.Item>
                <Dropdown.Item eventKey={35} onSelect={handleLimit}>35</Dropdown.Item>
                <Dropdown.Item eventKey={40} onSelect={handleLimit}>40</Dropdown.Item>
                <Dropdown.Item eventKey={45} onSelect={handleLimit}>45</Dropdown.Item>
                <Dropdown.Item eventKey={50} onSelect={handleLimit}>50</Dropdown.Item>
              </DropdownButton>
            )
          }
        }
        setItems(newItems)
      }
      catch(err){
        swal("upss something is wrong", "something went wrong, please try again", "error")
      }
    }
    getspaces()
  },[rendering])

  const handleLimit = (newLimit) => {
    setLimit(newLimit)
    setActive(1)
    let qs = locationParsed
      qs.page = 1
      qs.limit = newLimit
      queryStr = queryString.stringify(qs)
      history.push("/home?"+queryStr)
      dispatch(changeRendering())
  }

  const handlePage = (page) => {
    return () => {
      setActive(page)
      let qs = locationParsed
      qs.page = page
      qs.limit = limit
      queryStr = queryString.stringify(qs)
      history.push("/home?"+queryStr)
      dispatch(changeRendering())
    }
  }
  
   const handleSubmit = () => {
      let qs = {}
        qs.title = title
        qs.area =  `${area}-${parseInt(area)+1000}`
        qs.location = location.toUpperCase()
        qs.inDate = initialDate
        qs.finDate = finalDate 
        dispatch(changeSpaces([]))
      if (specificSearch) {
        qs.height= `${height}-20`
        qs.width= `${width}-40`
        qs.length= `${length}-40`
        qs.tag= tags.flatMap(elem => [elem.name]).join('-')      
        qs.pricePerDay= pricePerDay
        qs.pricePerMonth= pricePerMonth
      }           
      queryStr= queryString.stringify(qs)
      history.push("/home?"+queryStr)
      dispatch(changeRendering())
  }

  const infoFunction = (spaceId) => {
    return ()  => window.open(`/space?_id=${spaceId}&startDate=${initialDate}&endDate=${finalDate}`)
  }

  return (
    <Container className="mb-5">
      <SearchForm showButton={search.specificSearch} onSubmit={handleSubmit} />
        {search.specificSearch && <SearchAdvancedForms onSubmit={handleSubmit} />}
        <h3>Best Rated Locations</h3>
      <div>
        <p>{message}</p>
        <Pagination size='sm' className="justify-content-center mb-3 mt-3">{items}</Pagination>
      </div>
      <Spaces spaces={spaces} infoFunction={infoFunction} />
      <div>
        <p>{message}</p>
        <Pagination size='sm' className="justify-content-center mb-3">{items}</Pagination>
      </div>
      <div className='mb-5'><br/></div>
    </Container>
  );
};

export default Home;