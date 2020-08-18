import React, {useState,useEffect} from 'react';

function DisplayProfile(props){
  let [photo,setPhoto]=useState("https://i.picsum.photos/id/304/536/354.jpg?hmac=yKhk9YES06Et_q5794eegYXmraeuLv_HcjdZaC3llOc");
  let [name,setName]=useState("");  
  let [email,setEmail]=useState("");  
  let [phoneNumber,setPhoneNumber]=useState(""); 
  let [averageScore,setAverageScore]=useState(0);  
  let [createdAt,setCreatedAt]=useState("");
  let [country,setCountry]=useState("");  
  let [city,setCity]=useState(""); 
  
  useEffect(()=>{
    setName(name=props.data.name);
    setEmail(email=props.data.email);
    setAverageScore(averageScore=props.data.averageScore);
    setPhoneNumber(phoneNumber=props.data.phoneNumber);
    setCreatedAt(createdAt=props.data.createdAt);
    setCountry(country=props.data.country);
    setCity(city=props.data.city);
  })

  return(
    <div>
      <form>
        <fieldset>
          <legend>Información del Usuario</legend>
          <img src={photo} width="200"/>
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