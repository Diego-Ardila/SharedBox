import React from 'react';
import axios from 'axios';
<<<<<<< Updated upstream
import { Form, Col,Row, Button, Container} from 'react-bootstrap';
import {  useHistory } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from "yup";

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
    const handleSubmit = (values) => {
        console.log(values)
        axios({
            url: "http://127.0.0.1:4000/lender",
            method: "POST",
            data: values,
        }) 
        .then(({data})=>{
            localStorage.setItem('token', data); 
            history.push('/lender/profile')
        })
        .catch((err)=>{
            this.props.handleError(err.response.data)
        })
    }  
    return(
        <Container>
            <Row className="justify-content-md-center mt-5">
            <Col md={4} sm={12}>
            <h4 class="text-center">Register User</h4>
            <Formik initialValues={{ name:"", email:"", phoneNumber:"",        password:"", v_password:""}} validationSchema={formSchema} onSubmit={ handleSubmit} >
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
=======
import { Container, Col, Card, Form, Button}from 'react-bootstrap'


const emailRegex=/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

class FormRegister extends React.Component {
    state={
        name:"",
        email:"",
        phoneNumber:"",
        password:"",
        v_password:"",
        submitError: "",
    }
    base={
        nameId:"name",
        emailId:"email",
        phoneId:"phoneNumber",
        passwordId:"password",
        v_passwordId:"v_password"
    }
    handleChange= (event) => {

        const { name , value } = event.target

        if("phoneNumber" === name){

            if(/(\+[0-9])?[ -]*^[0-9\b]+$/.test(value) || value ===""){

                this.setState({[name] : value})

            }

        } else if(name !== "phoneNumber") this.setState({ [name] : value })

    }
    handleSubmit = (event) => {

        event.preventDefault();
        this.setState ({
            submitError: "",
        }) 

        if(this.state.password === this.state.v_password && emailRegex.test(this.state.email)){
            axios({
                url: "http://127.0.0.1:4000/lender",
                method: "POST",
                data: this.state,
            }) 
            .then(({data})=>{
                localStorage.setItem('token', data); 
                this.props.history.push('/lender/profile')
            })
            .catch((err)=>{
                this.props.handleError(err.response.data)
            })

        }else if( 
                !emailRegex.test(this.state.email) && 
                this.state.password !== this.state.v_password 
                    
                ){

                this.setState({submitError : "Your password and your Email are not valid"}); 

        }else if(
                this.state.password !== this.state.v_password && 
                emailRegex.test(this.state.email)
                    
                ){
                this.setState({submitError : "Your passwords didn't match"})
        }else if(
                !emailRegex.test(this.state.email) && 
                this.state.password === this.state.v_password
                    
                ){
                this.setState({submitError : "your Email is not valid"})
        }

    }
    render(){
        return(
            <Container className="container-fluid p-3"  onSubmit={this.handleSubmit}>
                <Card className="p-3">
                    <Form >
                        <Form.Row className="justify-content-center">
                            <Col className="col-lg-10">
                                <Form.Group>
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control id={this.base.nameID} name={this.base.nameId} type="name" value={this.state.name} onChange = {this.handleChange} required/>
                                </Form.Group>
                            </Col>
                        </Form.Row>
                        <Form.Row className="justify-content-center">
                            <Col md  className="col-lg-5">
                                <Form.Group>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control id={this.base.emailId} name={this.base.emailId} type="email" value={this.state.email} onChange={this.handleChange} required/>
                                </Form.Group>
                            </Col>                    
                            <Col className="col-lg-5">
                                <Form.Group>
                                    <Form.Label>Phone</Form.Label>
                                    <Form.Control id={this.base.phoneID} name={this.base.phoneId} type="tel" value={this.state.phoneNumber}  onChange = {this.handleChange}  required/>
                                </Form.Group>
                            </Col>
                        </Form.Row>
                        <Form.Row className="justify-content-center">
                            <Col md  className="col-lg-5">
                                <Form.Group>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control id={this.base.passwordId} name={this.base.passwordId} type="password" value={this.state.password} onChange = {this.handleChange}  required/>
                                </Form.Group>
                            </Col>                    
                            <Col className="col-lg-5">
                                <Form.Group>
                                    <Form.Label>Validate Password:</Form.Label>
                                    <Form.Control id={this.base.v_passwordId} name={this.base.v_passwordId} type="password" value={this.state.v_password}  onChange = {this.handleChange}  required/>
                                </Form.Group>
                            </Col>
                        </Form.Row>
                        <Form.Row className=" justify-content-center">
                            <Col className="col-lg-5 ">
                                <Button  id = {this.base.submitId} type="submit" variant="primary" value = "Submit"  block>Save</Button>
                            </Col>
                        </Form.Row>
                        <p>{this.state.submitError}</p>
                    </Form>
                </Card>
            </Container>
        )
    }
}
export default FormRegister
>>>>>>> Stashed changes
