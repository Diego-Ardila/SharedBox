import React, { useEffect, useState } from 'react';
import axios from "axios"

function DisplayProfile(props){
  
  let [name,setName]=useState(props.data.name);
  let [email,setEmail]=useState(props.data.email);
  let [phoneNumber,setPhoneNumber]=useState(props.data.phoneNumber);
  let [country,setCountry]=useState(props.data.country);    
  let [city,setCity]=useState(props.data.city||"");     
  let [averageScore,setAverageScore]=useState(props.data.averageScore||0);     
  let [createdAt,setCreatedAt]=useState(props.data.createdAt||"");     


  useEffect(() => {
      axios({
        method:"GET",
        url: "http://127.0.0.1:4000/lender/",
        headers:{
            Authorization: 'Bearer '+localStorage.getItem('token')
        }
    })
    .then( response => {
        setName(response.data.name)
        setEmail(response.data.email)
        setPhoneNumber(response.data.phoneNumber)
        setCountry(response.data.country)
        setCity(response.data.city)
        setAverageScore(response.data.averageScore)
        setCreatedAt(response.data.createdAt)
    })
    .catch(error=>{
        console.log(error)
    })
  }, [])
  //const {name,email,averageScore,phoneNumber,createdAt,country,city} = props.data;

  return(
    <div>
      <form>
        <fieldset>
          <legend>Información del Usuario</legend>
          <img src="https://imageog.flaticon.com/icons/png/512/16/16480.png?size=1200x630f&pad=10,10,10,10&ext=png&bg=FFFFFFFF" width="200"/>
          <p>Nombre: {name}</p>
          <p>Email: {email}</p>
          <p>phone: {phoneNumber}</p>        
          <p>Score: {averageScore}</p>
          <p>Registered Since: {createdAt}</p>
          <p>About: {country} {city}</p>
          <a>My Spaces</a>
        </fieldset>
      </form>
    </div>
  );
}
export default DisplayProfile;