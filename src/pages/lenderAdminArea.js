import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import {getUserSpaces} from "../utils/HTTPrequests"
import MainView from '../components/lenderAdminArea/mainView';
import SpecificSpaceView from '../components/lenderAdminArea/specificSpaceView';

export default function LenderAdminArea (props) {
  
  const [spaces, setSpaces] = useState([])
  const [extSpaceId, setExtspaceId] = useState(props.location.externalSpaceId)
  const [error, setError] = useState("")
  const [moreInfoDisplay, setMoreInfoDisplay] = useState(false)
  const [spaceId, setSpaceId] = useState("")

  useEffect(() => {
    const getDataSpace = async()=>{
      try{
        const userSpaces = await getUserSpaces() || []
        setSpaces(userSpaces)        
      }catch(err) {
        setError(err)
      }
    }
    getDataSpace()  
  },[moreInfoDisplay]) 
  
  useEffect(() => {
      if(spaces.length!==0 && extSpaceId) setMoreInfoDisplay(true)
  },[spaces]) 
    
  const changeViewToDisplay = (spaceId) => {
    return () => () => {
      setMoreInfoDisplay(!moreInfoDisplay)
      if(spaceId) {setSpaceId(spaceId)}
    } 
  }
  
  return (
      <Container className="container-fluid mt-5 mb-5">
        {moreInfoDisplay ? (
          <SpecificSpaceView 
            spaces={spaces} 
            spaceId={extSpaceId? extSpaceId : spaceId} 
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