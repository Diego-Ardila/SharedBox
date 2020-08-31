import React from "react"
import LoginForm from "../components/login/LoginForm"
import styled from "styled-components"
import Header from "./Header";
import { Container } from "react-bootstrap";

class Login extends React.Component{
    state = {
        loginError : false,
        errMessage: ""
    }
    
    handleErrorLogin = (err) => {
        this.setState({loginError : true, errMessage : err})
    }

    render() {
        return(
            <Container sm={12}>
                <LoginForm handleErrorLogin = {this.handleErrorLogin} history = {this.props.history}></LoginForm>
                <br></br>
                <p>{this.state.loginError ? this.state.errMessage : ""}</p>
            </Container>


        )
    }
}
export default Login