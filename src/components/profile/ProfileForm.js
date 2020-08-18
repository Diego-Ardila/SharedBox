import React, {useState , useEffect} from 'react';
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
    const {score,registeredSince} = props.data;
    let [imageProfile,setImageProfile]=useState("https://imageog.flaticon.com/icons/png/512/16/16480.png?size=1200x630f&pad=10,10,10,10&ext=png&bg=FFFFFFFF");
    let [name,setName]=useState(props.data.name);
    let [email,setEmail]=useState(props.data.email);
    let [phone,setPhone]=useState(props.data.phone);
    let [about,setAbout]=useState(props.data.about);    
    let [nameValid,setNameValid]=useState(true);
    let [emailValid,setEmailValid]=useState(true);
    let [phoneValid,setPhoneValid]=useState(true);
    let [aboutValid,setAboutValid]=useState(true);  
    let [formValid,setFormValid]=useState(true);   
    
    useEffect(() => {
        if (emailValid && phoneValid ){
            setFormValid(true);
        } else {
            setFormValid(false)
        };
    })

    const handleSubmit = (event) => {
        //event.preventDefault();         
        axios({
            method:'put',
            url:'http://localhost:3001/user',
            data:{
                name,
                email,
                phone,
                score,//campo no requeridos por mongo 
                registeredSince,//campo no requeridos por mongo 
                about
            }
        })
    }   
    const handleChange = (event) => {
        const regexPhone = /^[+]*[\s0-9]{1,3} [\s0-9]{10}$/;
        const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        const regexNumber = /[+]?([0-9][ ,-]?)$/;
        const regexName = /([a-zA-Z\s])$/;
        if (event.target.id === base.phoneID && (regexNumber.test(event.target.value)||event.target.value ==="")){            
            setPhone(phone = event.target.value);
            if (!regexPhone.test(event.target.value)){   
                document.getElementById(base.phoneID).style.borderBottomColor = "red";
                setPhoneValid(false); 
            }
            else {                
                document.getElementById(base.phoneID).style.borderBottomColor = "";                
                setPhoneValid(true); 
            }
        }  
        if (event.target.id === base.emailID){            
            setEmail(email= event.target.value);
            if (!regexEmail.test(event.target.value)){
                document.getElementById(base.emailID).style.borderBottomColor = "red";                
                setEmailValid(false)
            } else {
                document.getElementById(base.emailID).style.borderBottomColor = "";
                setEmailValid(true)
            }
        }
        if (event.target.id === base.nameID && (regexName.test(event.target.value)||event.target.value==="")){
            setName(name = event.target.value);
        }
        
        
        /*if (event.target.id === base.aboutID)setAbout(about = event.target.value); */      
    }

    return(
        <div>  
            <form className= {base.formID} onSubmit = {handleSubmit}>
                <img id ={base.imageID} src={imageProfile}  height="100" />
                <br/>
                Name: <input id={base.nameID} type="name" value={name} onChange= {handleChange} required/>
                <br/>
                Email: <input id={base.emailID} type="email" value={email} onChange= {handleChange} required/>
                <br/>
                phone: <input id={base.phoneID} type="tel"  value={phone} maxLength={15} onChange= {handleChange} required/>
                <br/>
                about: <input id={base.aboutID} type="string" value={about} onChange= {handleChange} required/>
                <br/>
                <input type="submit" id={base.submitId} value="submit" disabled={!formValid} />
            </form>          
        </div>
    )
}
export default ProfileForm;