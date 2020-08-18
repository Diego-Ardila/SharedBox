import React, {useState,useEffect} from 'react';

function DisplayProfile(props){
  
  const {name,email,averageScore,phoneNumber,createdAt,country,city} = props.data;

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