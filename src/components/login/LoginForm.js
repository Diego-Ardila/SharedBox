import React from "react"
import axios from "axios"
import {Formik} from "formik"
import * as Yup from "yup";
import { Container, Card, Form, Button, Col, Image } from "react-bootstrap"
import Logo from "../../logo.svg";
import { useDispatch } from "react-redux";
import { changeLogin } from '../../actions/loginUser.actions'
import { Link, useHistory } from 'react-router-dom';


const base = {
    emailId: "login-email",
    passwordId: "login-password",
    formClass: "login-form",
    submitId: "login-submit"
}

function LoginForm (props) {
    const dispatch = useDispatch()
    let history = useHistory();

    const formSchema = Yup.object().shape({
        email: Yup.string().email().typeError('invalid Email').required("Required Field"),
        password: Yup.string().required("Required Field")   
      })    
    
    const handleSubmit = async (values, {setErrors}) =>  {
        try {            
            const response = await axios({
                 method:"POST",
                 url: "http://127.0.0.1:4000/lender/login",
                 data:{
                     email: values.email,
                     password: values.password
                 }
             })
             localStorage.setItem("token", response.data)
             dispatch(changeLogin(true))
             history.push("/lender/profile")
        }catch(error) {
            console.dir(error)
            if(error.response.status === 400) {
                setErrors({"password": error.response.data , "email": error.response.data})  
            }  
            if (error.response.status === 401){
                setErrors({"password": "Failed Authentication" , "email": "Failed Authentication"})     
            }
            if(error.message === "Network Error") { 
                setErrors({"password": "Failed connection to dataServer, check your connection to the internet and try again later"  , "email": "Failed connection to dataServer, check your connection to the internet and try again later" })
            }            
        }   
    }

    return (

        <Formik 
            initialValues = {{email: "" ,password: ""}}
            validationSchema = {formSchema}
            onSubmit = {handleSubmit}>
        {({handleSubmit, handleChange, handleBlur, values, touched, isValid, errors}) => (
            <Container >
                <Card md={8} className="p-5 mt-5">
                    <Form onSubmit={handleSubmit} className="justify-content-center mt-3">
                        <Form.Row className="justify-content-center">
                            <Col sm={6} md={4} className="justify-content-center">
                                <Image style= {{width: 187, height:64}} src={Logo} alt="logo"></Image>
                            </Col>
                        </Form.Row>
                        <Form.Row className="justify-content-center" >
                            <Col className="col-lg-6" >
                                <Form.Group controlId={base.emailId}>
                                <Form.Label>EMAIL</Form.Label>
                                <Form.Control name="email" type="text" placeholder="me@email.com" onChange ={handleChange} value={values.email} className={touched.email && errors.email ? "is-invalid" : null}  />
                                {touched.email && errors.email ? (
                                    <div className="error-message">{errors.email}</div>
                                ): null}
                                </Form.Group>            
                            </Col>      
                        </Form.Row>
                        <Form.Row className="justify-content-center">
                            <Col className="col-lg-6">
                                <Form.Group controlId={base.passwordId}>
                                <Form.Label>PASSWORD</Form.Label>
                                <Form.Control name="password" type="password" placeholder="xxxxxx" onChange ={handleChange} value={values.password} className={touched.password && errors.password ? "is-invalid" : null}  />
                                {touched.password && errors.password ? (
                                    <div className="error-message">{errors.password}</div>
                                ): null}
                                </Form.Group>            
                            </Col>  
                        </Form.Row>
                        <Form.Row className="justify-content-center">
                            <Button type ="submit">LOGIN</Button>
                        </Form.Row>
                        <Form.Row className="justify-content-center mt-5">
                            <Link to="/lender/register" >Create account</Link>
                        </Form.Row>
                    </Form>
                </Card>
            </Container>
        )}
        </Formik>       
    )
}
export default LoginForm