import React, {useState , useEffect} from 'react';
import {Form,Container,Image,Card,Col,Button} from 'react-bootstrap'
import {getDataUser, UpdateDatauser} from '../../utils/HTTPrequests'
import { Formik } from 'formik';
import * as Yup from 'yup'
import {useHistory} from 'react-router-dom'
import { ArrowLeft } from 'react-bootstrap-icons'

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
    let [name,setName]=useState("");
    let [email,setEmail]=useState("");
    let [phoneNumber,setPhoneNumber]=useState("");
    let [country,setCountry]=useState("");    
    let [city,setCity]=useState("");     
    let [stateView,setStateView]=useState(false);
    let [error,setError]=useState('');
    const history = useHistory()
    
    
    useEffect(() => {
        async function getDatesUser (){
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
        }
        getDatesUser()
    },[stateView])

    const handleSubmit = async (values) => {
        
        if (stateView){
            try{
                const dataUser = await UpdateDatauser(props.typeUser,values)
                setStateView(!stateView)
            }
            catch(err){
                console.dir(err)                   
            }
        }else{
            setStateView(!stateView)
        }
    }

    const formSchema = Yup.object().shape({
        name : Yup.string().required("Required Field"),
        email: Yup.string().email().required("Required Field"),
        phoneNumber : Yup.number().test('len', 'Must be exactly 10 characters', val => val && val.toString().length === 10 ),
        country : Yup.string().required("Required Field"),
        city : Yup.string().required("Required Field")
    })
    return(
        <Container className="container-fluid p-3">
            <Card className="p-3">
                <Formik initialValues={{name,email,phoneNumber,country,city}}  
                        validationSchema={stateView?formSchema:""}  
                        onSubmit={handleSubmit} 
                        enableReinitialize={true}>
                    {({ handleSubmit, handleChange, handleBlur, values, touched, isValid, errors })=>(
                        <Form  onSubmit={handleSubmit} noValidate>
                            <Form.Row className="justify-content-left" >
                                <Col className=" text-left ">
                                    {props.typeUser==="tenant"?
                                    (<Button type="" onClick={()=>history.push("/tenant/admin")} ><ArrowLeft/></Button>):null}
                                </Col>
                            </Form.Row>
                            <Form.Row  className="justify-content-center">
                                <Col className=" text-center "   >
                                    <Image  src={imageProfile} height ={100} />
                                </Col>                       
                            </Form.Row>
                            <Form.Row className="justify-content-center">
                                <Col className="col-lg-10">
                                    <Form.Group controlId={base.nameID}>
                                        <Form.Label>Name</Form.Label>
                                        {stateView ?
                                            (<Form.Control  name="name" type="text" value={values.name} onChange = {handleChange} 
                                                            className={touched.name && errors.name ? "is-invalid" : null}/>)
                                            :(<Col md className="col-lg-5 text-left "> <label>{values.name}</label> </Col>)}
                                        {touched.name && errors.name ? (<div className="error-message">{errors.name}</div>): null}
                                    </Form.Group>
                                </Col>
                            </Form.Row>
                            <Form.Row className="justify-content-center">
                                <Col md  className="col-lg-5">
                                    <Form.Group controlId={base.emailID}>
                                        <Form.Label>Email</Form.Label>
                                        {stateView ?
                                            (<Form.Control  name = "email" type="email" value={values.email} onChange = {handleChange}  
                                                            className={touched.email && errors.email ? "is-invalid" : null} />)
                                            :(<Col md className="col-lg-5 text-left"><label>{values.email}</label></Col>)}
                                        {touched.email && errors.email ? (<div className="error-message">{errors.email}</div>): null}
                                    </Form.Group>
                                </Col>                    
                                <Col className="col-lg-5">
                                    <Form.Group controlId={base.phoneID}>
                                        <Form.Label>Phone</Form.Label>
                                        {stateView ?
                                            (<Form.Control  name="phoneNumber" type="tel" value={values.phoneNumber}  onChange = {handleChange} 
                                                            className={touched.phoneNumber && errors.phoneNumber ? "is-invalid" : null} />)
                                            :(<Col md className="col-lg-5 text-left"><label>{values.phoneNumber}</label></Col>)}
                                        {touched.phoneNumber && errors.phoneNumber ? (<div className="error-message">{errors.phoneNumber}</div>): null}
                                    </Form.Group>
                                </Col>
                            </Form.Row>
                            <Form.Row className="justify-content-center">
                                <Col md className="col-lg-5">
                                    <Form.Group controlId={base.countryID}>
                                        <Form.Label>Country</Form.Label>
                                        {stateView ?
                                            (<Form.Control  name="country"type="text" value={values.country} onChange = {handleChange} 
                                                            className={touched.country && errors.country ? "is-invalid" : null}/>)
                                            :(<Col md className="col-lg-5 text-left "><label>{values.country}</label></Col>)}
                                        {touched.country && errors.country ? (<div className="error-message">{errors.country}</div>): null}
                                    </Form.Group>
                                </Col>                    
                                <Col className="col-lg-5">
                                    <Form.Group controlId={base.cityID}>
                                        <Form.Label>City</Form.Label>
                                        {stateView ?
                                            (<Form.Control  name="city" type="text" value={values.city} onChange = {handleChange} 
                                                            className={touched.city && errors.city ? "is-invalid" : null}/>)
                                            :(<Col md className="col-lg-5 text-left"><label>{values.city}</label></Col>)}
                                        {touched.city && errors.city ? (<div className="error-message">{errors.city}</div>): null}
                                    </Form.Group>
                                </Col>
                            </Form.Row >
                            <Form.Row className=" justify-content-center">
                                <Col className="col-lg-5 ">
                                    {stateView? 
                                    (<Button    id = {base.submitId} variant={isValid?"primary":"secondary"} type = "submit"  
                                                disabled= {!isValid} block>Save</Button>)
                                    :(<Button type="submit"  block>Edit profile</Button>)}
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
