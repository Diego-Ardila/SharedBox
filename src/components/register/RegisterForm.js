import React from 'react';
import { Form, Col,Row, Button, Container} from 'react-bootstrap';
import {  useHistory } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from "yup";
import {userRegister} from "../../utils/HTTPrequests"

const base={
    nameId:"name",
    emailId:"email",
    phoneId:"phoneNumber",
    passwordId:"password",
    v_passwordId:"v_password"
}
const RegisterForm = (props) => {  
    const history = useHistory(); 
    const formSchema = Yup.object().shape({   
        name: Yup.string().required("Required Field"),
        email: Yup.string().email().required("Required Field"),
        phoneNumber: Yup.number().test('len', 'Must be exactly 10 characters', val => val && val.toString().length === 10 ),
        password: Yup.string().required("Required Field"),
        v_password: Yup.string().oneOf([Yup.ref('password')], "Passwords must match").required("Required Field")
    })     
    const handleSubmit = async (values) => {
        try{
        const userToken = await userRegister(props.typeUser,values)
        localStorage.setItem("token", userToken.data)
        history.push(props.typeUser==="lender" ? `/user/profile`: '/tenant/admin')
        }catch(err){
            console.dir(err)
            props.handleError(err.response.data)
        }
    }  
    return(
        <Container>
            <Row className="justify-content-md-center mt-5">
            <Col md={4} sm={12}>
            <h4 class="text-center">Register User</h4>
            <Formik initialValues={{ name:"", email:"", phoneNumber:"", password:"", v_password:""}} validationSchema={formSchema} onSubmit={ handleSubmit} >
            {({ handleSubmit, handleChange, handleBlur, values, touched, isValid, errors }) => (
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
                    <Button variant="primary" size="md" type="submit">
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
