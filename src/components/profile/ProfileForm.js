import React, {useState , useEffect} from 'react';
import {Form,Container,Image,Card,Col,Button} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
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
            
            
        })
        .catch(error=>{
            console.log(error)
        })
    },[])

    const handleSubmit = (event) => {
        event.preventDefault();
        axios({
            method:'PUT',
            url: "http://127.0.0.1:4000/lender/",
            headers:{
                Authorization: "Bearer "+localStorage.getItem('token')
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
        <Container className="container-fluid p-3" onSubmit={handleSubmit}>
            <Card className="p-3">
                <Form >
                    <Form.Row  className="justify-content-center">
                        <Col className=" text-center "   >
                            <Image  src={imageProfile} height ={100} />
                        </Col>                       
                    </Form.Row>
                    <Form.Row className="justify-content-center">
                        <Col className="col-lg-10">
                            <Form.Group>
                                <Form.Label>Name</Form.Label>
                                <Form.Control id={base.nameID} type="name" value={name} onChange = {handleChange} required/>
                            </Form.Group>
                        </Col>
                    </Form.Row>
                    <Form.Row className="justify-content-center">
                        <Col md  className="col-lg-5">
                            <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <Form.Control id={base.emailID} type="email" value={email} onChange = {handleChange} style={{borderColor:emailValid ? "" : "red"}} required/>
                            </Form.Group>
                        </Col>                    
                        <Col className="col-lg-5">
                            <Form.Group>
                                <Form.Label>Phone</Form.Label>
                                <Form.Control id={base.phoneID} type="tel" value={phoneNumber}  onChange = {handleChange} required style={{borderColor:phoneValid ? "" : "red"}} required/>
                            </Form.Group>
                        </Col>
                    </Form.Row>
                    <Form.Row className="justify-content-center">
                        <Col md className="col-lg-5">
                            <Form.Group>
                                <Form.Label>Country</Form.Label>
                                <Form.Control id={base.countryID} type="String" value={country} onChange = {handleChange} required/>
                            </Form.Group>
                        </Col>                    
                        <Col className="col-lg-5">
                            <Form.Group>
                                <Form.Label>City</Form.Label>
                                <Form.Control id={base.cityID} type="String" value={city} onChange = {handleChange} required/>
                            </Form.Group>
                        </Col>
                    </Form.Row >
                    <Form.Row className=" justify-content-center">
                        <Col className="col-lg-5 ">
                            <Button  id = {base.submitId} type="submit" variant={formValid?"primary":"secondary"} value = "Submit" disabled= {!formValid} block>Save</Button>
                        </Col>
                    </Form.Row>
                </Form>
            </Card>
        </Container>
    )
}
export default ProfileForm;