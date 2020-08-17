import React from "react"
import LoginForm from "../components/login/login_form"

class Login extends React.Component{
    state = {
        loginError : false,
        errMessage: ""
    }
    
    //change the state of error in login
    handleErrorLogin = (err) => {
        this.setState({loginError : true, errMessage : err})
    }

    render() {
        return(
            <div className = "login-page">
                <div>
                    <p>LOGIN HEADER (TO DO)</p>

                    <LoginForm handleErrorLogin = {this.handleErrorLogin}></LoginForm>
                </div>
                <button>new user? create new account</button><br></br>
                <p>{this.state.loginError ? this.state.errMessage : ""}</p>
                <p>FOOTER (TO DO)</p>
            </div>
        )
    }
}
export default Login