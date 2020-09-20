import React, {useState , useEffect} from 'react';
import {Form,Container,Image,Card,Col,Button} from 'react-bootstrap'
import {getDataUser, updateDatauser, deleteTenant} from '../../utils/HTTPrequests' 
import { Field, Formik } from 'formik';
import * as Yup from 'yup'
import {useHistory} from 'react-router-dom'
import { ArrowLeft } from 'react-bootstrap-icons'
import swal from 'sweetalert'
import usePushNotifications from '../notifications/usePushNotifications'

const base = {
    imageID: "profile-image",
    nameID: "profile-name",
    emailID: "profile-email",    
    phoneID: "profile-phone",    
    countryID: "profile-country",
    cityID: "profile-city",
    formID: "profile-form",
    submitId: "profile-submit",  
    deleteId: "profile-delete"  
}

function ProfileForm(){
    const history = useHistory()
    let imageProfile = "https://imageog.flaticon.com/icons/png/512/16/16480.png?size=1200x630f&pad=10,10,10,10&ext=png&bg=FFFFFFFF"
    let [name,setName]=useState("");
    let [email,setEmail]=useState("");
    let [phoneNumber,setPhoneNumber]=useState("");
    let [country,setCountry]=useState("");    
    let [city,setCity]=useState("");     
    let [stateView,setStateView]=useState(false);
    let [userId, setUserId] = useState("");
    let [isSubscribed, setIsSubscribed] = useState(false)
    let typeUser = localStorage.getItem("typeUser")

    const {
        userConsent,
        pushNotificationSupported,
        onClickSubscribeToNotifications,
        onClickCancelSubscriptionToPushServer,
        onClickSendNotification,
        error,
        loading
    } = usePushNotifications();
    const isConsentGranted = userConsent === "granted";       
    
    useEffect(() => {
        async function getDatesUser (){
            try{
                const userData = await getDataUser(typeUser)
                setName(userData.data.name)            
                setEmail(userData.data.email)
                setPhoneNumber(userData.data.phoneNumber)
                setCountry(userData.data.country)
                setCity(userData.data.city)
                setUserId(userData.data._id)
                setIsSubscribed(userData.data.isSubscribed)
            }
            catch(err){
                swal("profile error", "something went wrong, please try again", "error")
            }
        }
        getDatesUser()
    },[stateView])

    const handleSubmit = async (values) => {
        if (stateView){
            try{
                await updateDatauser(typeUser,values)
                values.isSubscribed ? await onClickSubscribeToNotifications() : await onClickCancelSubscriptionToPushServer()
                swal("update successful","your changes to your profile were saved succesfully","success")
                setStateView(!stateView)
            }
            catch(err){
                swal("update error", "something went wrong, please try again", "error")                 
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

    const deleteUser = async () => {
        swal("Are you sure to delete your profile?",
        "All of your registered resources will be deleted", {
            dangerMode: true,
            buttons: true,
        }).then((value) => {
            if(value) {
                deleteTenant(userId, localStorage.getItem("typeUser")).then(() => {
                    swal("Good job", "User deleted successfully", "success").then(() => {
                    history.push({ pathname: '/lender/logout', fromMenu : false})
                    })
                })
                .catch(() => swal("Oops..", "Something went wrong, please try again", "error") )                
            }
        });
    }
    return(
        <Container className="container-fluid p-3">
            <Card className="p-3">
                <Formik initialValues={{name,email,phoneNumber,country,city, isSubscribed}}  
                        validationSchema={stateView ? formSchema: ""}  
                        onSubmit={handleSubmit} 
                        enableReinitialize={true}>
                    {({ handleSubmit, handleChange, handleBlur, values, touched, isValid, errors, field, setFieldValue })=>(
                        <Form  onSubmit={handleSubmit} noValidate>
                            <Form.Row className="justify-content-left" >
                                <Col className=" text-left ">
                                    {typeUser==="tenant"?
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
                                            (<Form.Control  name="country" type="text" value={values.country} onChange = {handleChange} 
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
                            <Form.Row className="justify-content-center">                    
                                <Col md lg>
                                <Field name="isSubscribed" type="checkbox"  className="justify-content-center" >
                                {({ field: {value}, form: {setFieldValue} }) => (
                                    <>
                                    {stateView ? 
                                    <Form.Check  className="justify-content-center"  inline label="Activate Notifications" checked={values.isSubscribed} onClick={() => setFieldValue('isSubscribed',!values.isSubscribed)} />  
                                    : <Form.Check disabled className="justify-content-center"  inline label="Activate Notifications" checked={values.isSubscribed}  /> }
                                    </>                                     
                                )                              }                                 
                                </Field>   
                                </Col>                                                
                            </Form.Row>  
                            <Form.Row>
                            <p>
                            User consent to recieve push notificaitons is <strong>{userConsent}</strong>.
                            </p>                            
                            <Button onClick={onClickSendNotification}>Send a notification</Button>                       
                            </Form.Row>                              
                            
                            
                            <Form.Row className=" justify-content-center">
                                <Col className="col-lg-5 ">
                                    {stateView? 
                                    (<Button    id = {base.submitId} variant={isValid?"primary":"secondary"} type = "submit"  
                                                disabled= {!isValid} block>Save</Button>)
                                    :(<Button type="submit"  block>Edit profile</Button>)}
                                </Col>
                            </Form.Row>
                            <Form.Row className=" justify-content-center mt-3">
                                <Col className="col-lg-5 ">
                                    <Button    
                                    id = {base.deleteId} 
                                    variant="danger" 
                                    onClick={()=>deleteUser()} block
                                    >
                                        Delete Profile
                                    </Button>
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
