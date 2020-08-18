import React, {useState , useEffect} from 'react';
import axios from 'axios';

const base = {
    imageID: "profile-image",
    nameID: "profile-name",
    emailID: "profile-email",    
    phoneID: "profile-phone",    
    countryID: "profile-country",
    cityID: "profile-city",

    formID: "profile-form",
    submitId: "profile-submit",    
}

function ProfileForm(props){
    
    let [imageProfile,setImageProfile]=useState("https://imageog.flaticon.com/icons/png/512/16/16480.png?size=1200x630f&pad=10,10,10,10&ext=png&bg=FFFFFFFF");
    let [name,setName]=useState(props.data.name);
    let [email,setEmail]=useState(props.data.email);
    let [phoneNumber,setPhoneNumber]=useState(props.data.phoneNumber);
    let [country,setCountry]=useState(props.data.country);    
    let [city,setCity]=useState(props.data.city||"");     
    let [emailValid,setEmailValid]=useState(true);
    let [phoneValid,setPhoneValid]=useState(true);      
    let [formValid,setFormValid]=useState(true);  
    let [error,setError]=useState('');
    
    useEffect(() => {
        if (emailValid && phoneValid ){
            setFormValid(true);
        } else {
            setFormValid(false)
        };
    },[emailValid,phoneValid])

    const handleSubmit = (event) => {
        event.preventDefault();
        axios({
            method:'PUT',
            url: "http://127.0.0.1:4000/lender/",
            headers:{
                Authorization: "Bearer "+localStorage.getItem('Token')
            },
            data:{
                name,
                email,
                phoneNumber,            
                country,
                city
            }
        })
        .then( response => { 
             props.handleClick();
        })
        .catch(error=>{
            setError(error)
        })
    }   
    const handleChange = (event) => {
        const regexPhone = /^[\s0-9]{10}$/;
        const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        const regexNumber = /([0-9][ ,-]?)$/;
        const regexletters = /([a-zA-Z\s])$/;
        
        if (event.target.id === base.nameID && (regexletters.test(event.target.value)||event.target.value==="")){
            setName(name = event.target.value);
        }  
        
        if (event.target.id === base.emailID){            
            setEmail(email= event.target.value);
            if (!regexEmail.test(event.target.value)){
                setEmailValid(false)
            } else {
                setEmailValid(true)
            }
        } 

        if (event.target.id === base.phoneID && (regexNumber.test(event.target.value)||event.target.value ==="")){            
            setPhoneNumber(phoneNumber = event.target.value);
            if (!regexPhone.test(event.target.value)){   
                setPhoneValid(false); 
            }
            else {                
                setPhoneValid(true); 
            }
        }  
        
        if (event.target.id === base.countryID && (regexletters.test(event.target.value)||event.target.value==="")){
            setCountry(country = event.target.value);   
        }
        
        if (event.target.id === base.cityID && (regexletters.test(event.target.value)||event.target.value==="")){
            setCity(city = event.target.value);   
        }
    }

    return(
        <div>  
            <form className= {base.formID} onSubmit = {handleSubmit}>
                <img id ={base.imageID} src={imageProfile}  height="100" />
                <br/>
                Name: <input id={base.nameID} type="name" value={name} onChange= {handleChange} required/>
                <br/>
                Email: <input id={base.emailID} type="email" value={email} onChange= {handleChange} required style={{borderBottomColor:emailValid ? "" : "red"}}/>
                <br/>
                phone: <input id={base.phoneID} type="tel"  value={phoneNumber} maxLength={15} onChange= {handleChange} required style={{borderBottomColor:phoneValid ? "" : "red"}}/>
                <br/>
                country: <input id={base.countryID} type="string" value={country} onChange= {handleChange} required/>
                <br/>
                city: <input id={base.cityID} type="string" value={city} onChange= {handleChange} required/>
                <br/>
                <input type="submit" id={base.submitId} value="submit" disabled={!formValid} />
            </form>          
        </div>
    )
}
export default ProfileForm;