import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import {getUserSpaces} from "../utils/HTTPrequests"

import MainView from '../components/lenderAdminArea/mainView';
import SpecificSpaceView from '../components/lenderAdminArea/specificSpaceView';

export default function LenderAdminArea () {
  
  const [spaces, setSpaces] = useState([])
  const [error, setError] = useState("")
  const [moreInfoDisplay, setMoreInfoDisplay] = useState(false)
  const [spaceId, setSpaceId] = useState("")
  
  useEffect(() => {
    async function fetchSpacesData(){
      try{
        const userSpaces = await getUserSpaces() || []
        setSpaces(userSpaces)
      }catch(err) {
        setError(err)
      }
    }
    fetchSpacesData()
  },[])  

  const displayMoreInfo = (spaceId) => {
    return () => {
      setMoreInfoDisplay(true)
      setSpaceId(spaceId)
    } 
  }
  
  return (
      <Container className="container-fluid mt-5 mb-5">
        {moreInfoDisplay ? <SpecificSpaceView spaces={spaces} spaceId={spaceId}></SpecificSpaceView> : <MainView error={error} spaces={spaces} displayMoreInfo={displayMoreInfo}></MainView> }
        </Container>
    )
}