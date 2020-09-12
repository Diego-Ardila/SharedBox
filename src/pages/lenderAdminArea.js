import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import {getUserSpaces} from "../utils/HTTPrequests"
import MainView from '../components/lenderAdminArea/mainView';
import SpecificSpaceView from '../components/lenderAdminArea/specificSpaceView';

export default function LenderAdminArea () {
  
  const [spaces, setSpaces] = useState([])
  const [error, setError] = useState("")
  const [moreInfoDisplay, setMoreInfoDisplay] = useState(false)
  const [spaceId, setSpaceId] = useState("")
  
  const fetchSpacesData = async() =>{
      try{
        const userSpaces = await getUserSpaces() || []
        setSpaces(userSpaces)
      }catch(err) {
        setError(err)
      }
  }

  useEffect(() => {
    fetchSpacesData()
  },[]) 
  
  useEffect(() => {
    fetchSpacesData()
  },[moreInfoDisplay]) 

  const changeViewToDisplay = (spaceId) => {
    return () => {
      setMoreInfoDisplay(!moreInfoDisplay)
      if(spaceId) setSpaceId(spaceId)
    } 
  }
  
  return (
      <Container className="container-fluid mt-5 mb-5">
        {moreInfoDisplay ? (
          <SpecificSpaceView 
            spaces={spaces} 
            spaceId={spaceId} 
            changeViewToDisplay={changeViewToDisplay}
            edit={true}
          ></SpecificSpaceView>
          ) : (
          <MainView 
            error={error} 
            spaces={spaces} 
            displayMoreInfo={changeViewToDisplay}
          ></MainView> 
          )
        }
        </Container>
    )
}