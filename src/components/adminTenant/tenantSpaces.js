import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Container } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Spaces from '../viewSpaces/Spaces';
import {getTenantRegisteredSpaces} from "../../utils/HTTPrequests";
import moment from 'moment';
import queryString from 'query-string';

const TenantSpaces = () => {
  const [key, setKey] = useState("current")
  const [spaces, setSpaces] = useState([])
  const [error, setError] = useState("")
  const [moreInfoDisplay, setMoreInfoDisplay] = useState(false)
  const [spaceId, setSpaceId] = useState("")

  const history = useHistory();  

  const infoFunction = (spaceId) => {
    return ()  => window.open(`/space?_id=${spaceId}&startDate=${moment().format("YYYY-MM-DD")}&endDate=${moment().add(1,'days').format("YYYY-MM-DD")}`)
  }

  const fetchSpacesData = async() =>{
    try{
      const userSpaces = await getTenantRegisteredSpaces(`?state=${key}`) || []
      setSpaces(userSpaces)
    }catch(err) {
      setError(err)
    }
  }

  useEffect(() => {
    fetchSpacesData()
  },[moreInfoDisplay,key]) 

  return (
    <Container className="mb-5" >
    <Tabs
      id="controlled-tab-example"
      className="mt-2 mb-2"
      activeKey={key}
      onSelect={(k) => { 
        setKey(k)
        let qs={};
        qs.state = k
        let queryStr = queryString.stringify(qs)
        history.push("/tenant/spaces?"+queryStr)
      }
      }
    >
      <Tab eventKey="current" title="Current Spaces">
        {spaces && spaces.length > 0 ?
          <Spaces spaces={spaces} infoFunction={infoFunction} />
        : <h4>You don't have current spaces </h4>}
      </Tab>
      <Tab eventKey="reserved" title="Reserved Spaces">
        {spaces && spaces.length > 0 ?
            <Spaces spaces={spaces} infoFunction={infoFunction} />
          : <h4>You don't have reserved spaces </h4>}
      </Tab>
      <Tab eventKey="incoming" title="Incoming Spaces" disabled>
        <h3>No</h3>
      </Tab>
    </Tabs>
    </Container>
  );
};

export default TenantSpaces;