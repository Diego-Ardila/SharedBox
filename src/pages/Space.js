import React, { useEffect, useState } from "react"
import { useLocation, useHistory } from 'react-router-dom';
import { getFilterSpaces, getTenantRegisteredSpaces } from "../utils/HTTPrequests";
import swal from "sweetalert";
import {useSelector} from 'react-redux'
import { Container, Spinner } from "react-bootstrap";
import SpecificSpaceView from "../components/lenderAdminArea/specificSpaceView";




export default function Space () {
    
    const [spaces, setSpace] = useState([])
    const [loading, setLoading] = useState(true)
    const locationQuery = useLocation()
    const history = useHistory()
    const spaceId = locationQuery.search.slice(5,29)

    const isLogged = useSelector(state => state.loginUserReducer.isLogged)   
    useEffect( () => {
        async function getSpace () {
            try{
                const spaces =  await getFilterSpaces(locationQuery.search)
                setSpace(spaces)
                setLoading(false)
            }catch(err){
                swal("Something went wrong!",`${err.message}`,"error")
            }
       }
        getSpace()
   }, [isLogged])

   const changeViewToDisplay = () => {
       return () => ()=> history.push("/home")
   }

    return(
        <Container className="mb-5">
            {loading ? <Spinner /> : (
                <SpecificSpaceView
                    spaceId={spaceId}
                    spaces={spaces}
                    changeViewToDisplay= {changeViewToDisplay}
                    edit = {false}
                >
                </SpecificSpaceView>
            )}
        </Container>
   ) 
}