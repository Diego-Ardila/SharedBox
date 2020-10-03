import React from 'react';
import { FilePond, registerPlugin } from 'react-filepond'
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import { Form, Col,Row, Button, Container, Spinner} from 'react-bootstrap';
import {  useHistory } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { Formik, Field } from 'formik';
import * as Yup from "yup";
import {userRegister, postUserPhotosFiles} from "../../utils/HTTPrequests"
import { changeLogin, changeTypeUser, changeUserName, changeUserPhoto } from '../../actions/loginUser.actions'
import swal from 'sweetalert'
import usePushNotifications from '../notifications/usePushNotifications'

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)

const base={
    nameId:"name",
    emailId:"email",
    phoneId:"phoneNumber",
    isSubscribedId: "isSubscribed",
    passwordId:"password",
    v_passwordId:"v_password",
    uploadId : "photoUpload"
}
const RegisterForm = (props) => {  
    const history = useHistory(); 
    const dispatch = useDispatch()
    const formSchema = Yup.object().shape({   
        name: Yup.string().required("Required Field"),
        email: Yup.string().email().required("Required Field"),
        phoneNumber: Yup.number().typeError('Value must be a number').test('len', 'Must be exactly 10 characters', val => val && val.toString().length === 10 ),
        password: Yup.string().required("Required Field"),
        v_password: Yup.string().oneOf([Yup.ref('password')], "Passwords must match").required("Required Field"),
        files: Yup.array().required("Required Field").min(0,"Photos are not required").max(1,"The maximum amount of photos allowed are 1")
    })     

    const {
        userConsent,
        pushNotificationSupported,
        onClickSubscribeToNotifications,
        onClickCancelSubscriptionToPushServer,
        onClickSendNotification
    } = usePushNotifications();
    
    const handleSubmit = async (values, actions) => {
        try{
            const arrayFiles = [];
            values.files.forEach(file =>{
                arrayFiles.push(file.file);
            })      
            const {id, userToken} = await userRegister(props.typeUser,values)
            if (values.isSubscribed) onClickSubscribeToNotifications()
            localStorage.setItem("token", userToken)
            localStorage.setItem("typeUser", props.typeUser)
            localStorage.setItem("userName", values.name)            
            dispatch(changeLogin(true))
            dispatch(changeTypeUser(props.typeUser))
            dispatch(changeUserName(values.name))
            const data = new FormData();
            data.append('userId', id)
            data.append('file', arrayFiles[0])
            const response = await postUserPhotosFiles(props.typeUser,data)
            dispatch(changeUserPhoto(response.data.profilePhoto))
            localStorage.setItem("userPhoto", response.data.profilePhoto)  
            swal("Register successfully","Your registration were saved succesfully","success")
            actions.setSubmitting(false)
            history.push(props.typeUser==="lender" ? `/user/profile`: '/tenant/admin')
        }catch(err){
            swal("error", `${err.response.data}`, "error")
            actions.setSubmitting(false)
        }
    }     
    return(
        <Container className="mb-5">
            <Row className="justify-content-md-center mt-5 mb-5">
            <Col md={4} sm={12}>
            <h4 className="text-center">{`Register ${localStorage.getItem("typeUser").charAt(0).toUpperCase()+localStorage.getItem("typeUser").slice(1)}`}</h4>
            <Formik initialValues={{ name:"", email:"", phoneNumber:"", password:"", v_password:"", isSubscribed: false, files:[]}} validationSchema={formSchema} onSubmit={ handleSubmit} >
            {({ handleSubmit, handleChange, handleBlur, values, isSubmitting, touched, isValid, errors, setFieldValue }) => (
                <Form onSubmit={handleSubmit}  noValidate>
                    <Form.Group controlId={base.nameId}>
                        <Form.Label>Name</Form.Label>
                        <Form.Control name="name" type="text" placeholder="Enter Name" onChange ={handleChange} value={values.name} className={touched.name && errors.name ? "is-invalid" : null}  />
                        {touched.name && errors.name ? (
                            <div className="error-message">{errors.name}</div>
                        ): null}
                    </Form.Group>                      
                    <Form.Group controlId={base.emailId}>
                        <Form.Label>User E-mail</Form.Label>
                        <Form.Control name="email" type="text" placeholder="Enter Email" onChange ={handleChange} value={values.email} className={touched.email && errors.email ? "is-invalid" : null}  />
                        {touched.email && errors.email ? (
                            <div className="error-message">{errors.email}</div>
                        ): null}
                    </Form.Group> 
                    <Form.Group controlId={base.phoneId}>
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control name="phoneNumber" type="tel" placeholder="Enter Phone Number" onChange ={handleChange} value={values.phoneNumber} className={touched.phoneNumber && errors.phoneNumber ? "is-invalid" : null}  />
                        {touched.phoneNumber && errors.phoneNumber ? (
                            <div className="error-message">{errors.phoneNumber}</div>
                        ): null}
                    </Form.Group> 
                    <Form.Group controlId={base.passwordId}>
                        <Form.Label>Password</Form.Label>
                        <Form.Control name="password" type="password" placeholder="Enter Password" onChange ={handleChange} value={values.password} className={touched.password && errors.password ? "is-invalid" : null}  />
                        {touched.password && errors.password ? (
                            <div className="error-message">{errors.password}</div>
                        ): null}
                    </Form.Group> 
                    <Form.Group controlId={base.v_passwordId}>
                        <Form.Label>Validate Password</Form.Label>
                        <Form.Control name="v_password" type="password" placeholder="Enter Validate Password" onChange ={handleChange} value={values.v_password} className={touched.v_password && errors.v_password ? "is-invalid" : null}  />
                        {touched.v_password && errors.v_password ? (
                            <div className="error-message">{errors.v_password}</div>
                        ): null}
                    </Form.Group> 
                    <Form.Group controlId={base.uploadId}>
                        <FilePond
                            files={values.files}
                            onupdatefiles={fileItems => setFieldValue("files", fileItems)}
                            allowMultiple={false}
                            name="files"
                            labelIdle='Drag & Drop your photo or Browse'
                        />
                        {touched.files && errors.files ? (
                            <div className="error-message">{errors.files}</div>
                        ): null}
                    </Form.Group> 
                    <Form.Group controlId={base.isSubscribedId}>
                        <Field name="isSubscribed" type="checkbox" className="justify-content-center" >
                        {({ field: {value}, form: {setFieldValue} }) => (                            
                            <Form.Check className="justify-content-center"  label="Activate Notifications" checked={values.isSubscribed} onClick={() => setFieldValue('isSubscribed',!values.isSubscribed)} />
                        )}
                        </Field>          
                    </Form.Group>
                    {isSubmitting ? <Spinner animation="border" variant="primary" size="xl" /> : null}
                    <Button className="mb-5"variant={isValid?"primary":"secondary"} disabled= {!isValid && isSubmitting} size="md" type="submit">
                        Send
                    </Button>
                </Form>
            )}
            </Formik>
            </Col>
            </Row>
        </Container>
    )    
}
export default RegisterForm
