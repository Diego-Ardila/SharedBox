import React, { useEffect, useState } from "react"
import { useLocation, useHistory } from 'react-router-dom';
import { getFilterSpaces } from "../utils/HTTPrequests";
import swal from "sweetalert";
import { Container } from "react-bootstrap";
import SpecificSpaceView from "../components/lenderAdminArea/specificSpaceView";
import moment from "moment"



export default function Space () {
    const [spaces, setSpace] = useState([])
    const [loading, setLoading] = useState(true)
    const locationQuery = useLocation()
    const history = useHistory()
    const spaceId = locationQuery.search.slice(5,29)
    const startDate = moment(locationQuery.search.slice(40,50),"YYYY-MM-DD") 
    const endDate = moment(locationQuery.search.slice(59),"YYYY-MM-DD") 
   
    
    useEffect( () => {
        async function getSpace () {
            try{
                const spaces = await getFilterSpaces(locationQuery.search)
                setSpace(spaces)
                setLoading(false)
            }catch(err){
                swal("somthing went wrong!",`${err.message}`,"error")
            }
       }
        getSpace()
   }, [])

   const changeViewToDisplay = () => {
       return () => history.push("/home")
   }

    return(
        <Container>
            {loading ? "loading" : (
                <SpecificSpaceView
                    spaceId={spaceId}
                    spaces={spaces}
                    changeViewToDisplay= {changeViewToDisplay}
                    edit = {false}
                    instartDate = {startDate}
                    inendDate = {endDate}
                >
                </SpecificSpaceView>
            )}
        </Container>
   ) 
}