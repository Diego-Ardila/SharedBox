import React, {useState , useEffect} from 'react';
import {Form,Container,Image,Card,Col,Button} from 'react-bootstrap'
import axios from 'axios';
import {getDataUser, UpdateDatauser} from '../../utils/HTTPrequests'
import { Formik } from 'formik';
import * as Yup from 'yup'

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

    useEffect( async () => {
        try{
            const userData = await getDataUser(props.typeUser)
            setName(userData.data.name)            
            setEmail(userData.data.email)
            setPhoneNumber(userData.data.phoneNumber)
            setCountry(userData.data.country)
            setCity(userData.data.city)
        }
        catch(err){
            console.dir(err)
        }
    },[])

    const handleSubmit = async (values) => {
        console.log(values)
        try{
        const dataUser = await UpdateDatauser(props.typeUser,values)
        props.handleClick()
        
        /*
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
        })*/
        }
        catch(err){
            setError(error)
        }
    }   
    
    const formSchema = Yup.object().shape({
        name : Yup.string().required("Required Field"),
        email: Yup.string().email().required("Required Field"),
        phoneNumber : Yup.number().required("Required Field"),
        country : Yup.string().required("Required Field"),
        city : Yup.string().required("Required Field")
    })
    return(
        <Container className="container-fluid p-3">
            <Card className="p-3">
                <Formik initialValues={{name,email,phoneNumber,country,city}} validationSchema={formSchema}  onSubmit={handleSubmit} enableReinitialize={true}>
                    {({ handleSubmit, handleChange, handleBlur, values, touched, isValid, errors })=>(
                        <Form  onSubmit={handleSubmit} noValidate>
                            <Form.Row  className="justify-content-center">
                                <Col className=" text-center "   >
                                    <Image  src={imageProfile} height ={100} />
                                </Col>                       
                            </Form.Row>
                            <Form.Row className="justify-content-center">
                                <Col className="col-lg-10">
                                    <Form.Group controlId={base.nameID}>
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control name="name" type="name" value={values.name} onChange = {handleChange} className={touched.name && errors.name ? "is-invalid" : null}/>
                                    </Form.Group>
                                </Col>
                            </Form.Row>
                            <Form.Row className="justify-content-center">
                                <Col md  className="col-lg-5">
                                    <Form.Group controlId={base.emailID}>
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control name = "email" type="email" value={values.email} onChange = {handleChange} className={touched.email && errors.email ? "is-invalid" : null} />
                                    </Form.Group>
                                </Col>                    
                                <Col className="col-lg-5">
                                    <Form.Group controlId={base.phoneID}>
                                        <Form.Label>Phone</Form.Label>
                                        <Form.Control name="phoneNumber" type="tel" value={values.phoneNumber}  onChange = {handleChange} className={touched.phoneNumber && errors.phoneNumber ? "is-invalid" : null} />
                                    </Form.Group>
                                </Col>
                            </Form.Row>
                            <Form.Row className="justify-content-center">
                                <Col md className="col-lg-5">
                                    <Form.Group controlId={base.countryID}>
                                        <Form.Label>Country</Form.Label>
                                        <Form.Control  name="country"type="String" value={values.country} onChange = {handleChange} className={touched.country && errors.country ? "is-invalid" : null}/>
                                    </Form.Group>
                                </Col>                    
                                <Col className="col-lg-5">
                                    <Form.Group controlId={base.cityID}>
                                        <Form.Label>City</Form.Label>
                                        <Form.Control  name="city" type="String" value={values.city} onChange = {handleChange} className={touched.city && errors.city ? "is-invalid" : null}/>
                                    </Form.Group>
                                </Col>
                            </Form.Row >
                            <Form.Row className=" justify-content-center">
                                <Col className="col-lg-5 ">
                                    <Button  id = {base.submitId} type="submit" variant={formValid?"primary":"secondary"} value = "Submit" disabled= {!formValid} block>Save</Button>
                                </Col>
                            </Form.Row>
                        </Form>
                    )}
                </Formik>
            </Card>
        </Container>
    )
}
export default ProfileForm;
