import React, {useState} from 'react';

function DisplayProfile(props){
  let [name,setName]=useState("Donaldo");
  let [email,setEmail]=useState("donaldo@correo.com");  
  let [photo,setPhoto]=useState("https://i.picsum.photos/id/304/536/354.jpg?hmac=yKhk9YES06Et_q5794eegYXmraeuLv_HcjdZaC3llOc");
  let [score,setScore]=useState("10");
  let [spaces,setSpaces]=useState("Bastantes");
  let [registeredSince,setRegisteredSince]=useState("14/12/2018");
  let [about,setAbout]=useState("me");
  return(
    <div>
      <form>
        <fieldset>
          <legend>Información del Usuario</legend>
          <p>Nombre: {name}</p>
          <p>Email: {email}</p>
          <p>Photo: {photo}</p>
          <p>Score: {score}</p>
          <a>My Spaces</a>
          <p>Registered Since: {registeredSince}</p>
          <p>About:{about}</p>
        </fieldset>
      </form>
    </div>
  );
}

export default DisplayProfile;