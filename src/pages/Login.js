import React from "react"
import LoginForm from "../components/login/LoginForm"
import styled from "styled-components"
import Logo from "../logo.svg";
import Header from "./Header";


const MainWraper = styled.section`
    background: radial-gradient(50% 50% at 50% 50%, rgba(255, 255, 255, 0) 46.35%, rgba(130, 130, 130, 0.1) 100%), linear-gradient(180deg, #FFF9F4 1.12%, #B0CAC7 100%);
    height: 100vh;
    margin: 0 auto;
    border: 0;
    font-family: Montserrat;
    font-family: Montserrat;
    font-style: normal;
    font-weight: bold;
    font-size: 12px;
    line-height: 24px;
    `
const NewUserButton = styled.button` 
    background: none;
    opacity: 1;
    line-height: 24px;
    text-align: center;
    text-decoration-line: underline;
    color: #001244;
    border: none;
    &:hover {
        cursor: pointer;
    }
`
class Login extends React.Component{
    state = {
        loginError : false,
        errMessage: ""
    }
    
    handleErrorLogin = (err) => {
        this.setState({loginError : true, errMessage : err})
    }

    redirect = () => {
        this.props.history.push("/lender/register/")
    }

    render() {
        return(
            <MainWraper>
            <div className = "login-page">
                <div>                    
                    <br></br>
                    <br></br>
                    <br></br>
                    <img src={Logo} alt="logo"></img>
                    <LoginForm handleErrorLogin = {this.handleErrorLogin} history = {this.props.history}></LoginForm>
                </div>
                <br></br>
                <NewUserButton onClick={this.redirect}>new user? create new account</NewUserButton><br></br>
                <p>{this.state.loginError ? this.state.errMessage : ""}</p>
                <p>FOOTER (TO DO)</p>
            </div>
            </MainWraper>
        )
    }
}
export default Login