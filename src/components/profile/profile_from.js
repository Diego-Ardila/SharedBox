import React, {useState} from 'react'
import DisplayProfile from './DisplayProfile'
import axios from 'axios';

const base = {
    imageID: "profile-image",
    nameID: "profile-name",
    emailID: "profile-email",
    scoreID: "profile-score",
    phoneID: "profile-phone",
    spaceID: "profile-space",
    aboutID: "profile-about",
    formID: "profile-form",
    submitId: "profile-submit",
    
}

function ProfileForm(props){
    let [image_porfile,setimage_profile]=useState("https://imageog.flaticon.com/icons/png/512/16/16480.png?size=1200x630f&pad=10,10,10,10&ext=png&bg=FFFFFFFF");
    let [name,setName]=useState(props.data.name);
    let [email,setEmail]=useState(props.data.email);
    let [phone,setPhone]=useState(props.data.phone);
    let [about,setAbout]=useState(props.data.about);    
    let [valid,setvalid]=useState(true);
    

    const handleSubmit = (event)=>{
        //event.preventDefault();
         
            axios({
                method:'put',
                url:'http://localhost:3001/user',
                data:{
                    name,
                    email,
                    phone,
                    score:props.data.score,//campo no requeridos por mongo 
                    registeredSince:props.data.registeredSince,//campo no requeridos por mongo 
                    about
                }
            })
    }   
    const handleChange =(event)=>{
        const rePhone = /^[+]*[\s0-9]{1,3} [\s0-9]{10}$/;
        const reEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        const renumber = /[+]?([0-9][ ,-]?)$/;
        const reName = /([a-zA-Z\s])$/;

        if(event.target.id === base.phoneID && (renumber.test(event.target.value)||event.target.value ==="")){
            
            setPhone(phone = event.target.value);
            if(!rePhone.test(event.target.value)){   
                document.getElementById(base.phoneID).style.borderBottomColor = "red";
                setvalid(false); 
            }
            else{                
                document.getElementById(base.phoneID).style.borderBottomColor = "";
                setvalid(true)
            }
        }  

        if(event.target.id === base.emailID){
            
            setEmail(email= event.target.value);
            if(!reEmail.test(event.target.value)){
                document.getElementById(base.emailID).style.borderBottomColor = "red";                
                setvalid(false)
            }else{
                document.getElementById(base.emailID).style.borderBottomColor = "";
                setvalid(true)
            }
        }

        if(event.target.id === base.nameID &&(reName.test(event.target.value)||event.target.value==="")){
            setName(name = event.target.value);
        }
        if(event.target.id === base.aboutID)setAbout(about = event.target.value);       
    }

    return(
        <div>  
            <form className= {base.formID} onSubmit = {handleSubmit}>
                <img id ={base.imageID} src={image_porfile}  height="100" />
                <br/>
                Name: <input id={base.nameID} type="name" value={name} onChange= {handleChange}/>
                <br/>
                Email: <input id={base.emailID} type="email" value={email} onChange= {handleChange}/>
                <br/>
                phone: <input id={base.phoneID} type="tel"  value={phone} maxLength={15} onChange= {handleChange}/>
                <br/>
                about: <input id={base.aboutID} type="string" value={about} onChange= {handleChange}/>
                <br/>
                <input type="submit" id={base.submitId} value="submit" disabled={!valid} />
            </form>          
        </div>
    )
}
export default ProfileForm;