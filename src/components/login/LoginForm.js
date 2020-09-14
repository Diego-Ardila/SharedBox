import React,{ useState } from "react"
import { loginUser } from "../../utils/HTTPrequests"
import {Formik} from "formik"
import * as Yup from "yup";
import { Container, Card, Form, Button, Col, Image } from "react-bootstrap"
import Logo from "../../logo.svg";
import { useDispatch } from "react-redux";
import { changeLogin } from '../../actions/loginUser.actions'
import { Link, useHistory } from 'react-router-dom';
import swal from 'sweetalert'



const base = {
    emailId: "login-email",
    passwordId: "login-password",
    formClass: "login-form",
    submitId: "login-submit"
}

function LoginForm () {
    const dispatch = useDispatch()
    let history = useHistory();
    const [typeUser,setTypeUser]= useState(localStorage.getItem("typeUser")||"tenant")
    
    const formSchema = Yup.object().shape({
        email: Yup.string().email().typeError('invalid Email').required("Required Field"),
        password: Yup.string().required("Required Field")   
      })    

    const changeTypeUser = (event,errors) =>{
        
        switch (event.target.name){
            case "changeTenant":
                localStorage.setItem("typeUser","tenant")
                setTypeUser(localStorage.getItem("typeUser"))
                errors.email = false
                errors.password = false
                break
            
            case "changeLender":
                localStorage.setItem("typeUser","lender")
                setTypeUser(localStorage.getItem("typeUser"))
                errors.email = false
                errors.password = false
                break
        }
    } 
    
    const handleSubmit = async (values, {setErrors}) =>  {
        try { 
        const token = await loginUser(values,typeUser)
        localStorage.setItem("typeUser",typeUser)
        localStorage.setItem("token",token)
        dispatch(changeLogin(true))
        history.push("/home")
        }
        catch(error) {
            if(error.response.status === 400) {
                setErrors({"password":  "Password Incorrect", "email":"Email Incorrect"})
            }  
            if (error.response.status === 401){
                setErrors({"password": " " , "email": " "})
                swal("Login Failed", "Failed authentication, please try again", "error")     
            }
            if(error.message === "Network Error") { 
                setErrors({"password": " "  , "email": " " })
                swal("Login Failed", "Failed connection to dataServer, check your connection to the internet and try again later", "error")  
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
                        <Form.Row className="justify-content-center m-4">
                            <Col className="col-lg-3">
                                <Button name="changeLender" variant={typeUser==="lender"?"secondary":"primary"} disabled={typeUser==="lender"} onClick={(e)=>changeTypeUser(e,errors)} block>As a lender</Button>
                            </Col>
                            <Col className="col-lg-3">
                            <Button name="changeTenant" variant={typeUser==="tenant"?"secondary":"primary"} disabled={typeUser==="tenant"} onClick={(e)=>changeTypeUser(e,errors)} block>As a tenant</Button>
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
                            <Link to="/user/register" onClick={()=>localStorage.setItem("typeUser","tenant")}>Create account</Link>
                        </Form.Row>
                    </Form>
                </Card>
            </Container>
        )}
        </Formik>       
    )
}
export default LoginForm