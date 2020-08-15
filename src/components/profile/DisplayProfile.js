import React, {useState,useEffect} from 'react';

function DisplayProfile(props){
  let [photo,setPhoto]=useState("https://i.picsum.photos/id/304/536/354.jpg?hmac=yKhk9YES06Et_q5794eegYXmraeuLv_HcjdZaC3llOc");
  let [name,setName]=useState("");  
  let [email,setEmail]=useState("");  
  let [phone,setPhone]=useState(""); 
  let [score,setScore]=useState(0);  
  let [registeredSince,setRegisteredSince]=useState("");
  let [about,setAbout]=useState("");  
  
  useEffect(()=>{
    setName(name=props.data.name);
    setEmail(email=props.data.email);
    setScore(score=props.data.score);
    setPhone(phone=props.data.phone);
    setRegisteredSince(registeredSince=props.data.registeredSince);
    setAbout(about=props.data.about);
  })

  return(
    <div>
      <form>
        <fieldset>
          <legend>Información del Usuario</legend>
          <img src={photo} width="200"/>
          <p>Nombre: {name}</p>
          <p>Email: {email}</p>
          <p>phone: {phone}</p>        
          <p>Score: {score}</p>
          <p>Registered Since: {registeredSince}</p>
          <p>About: {about}</p>
          <a>My Spaces</a>
        </fieldset>
      </form>
    </div>
  );
}
export default DisplayProfile;