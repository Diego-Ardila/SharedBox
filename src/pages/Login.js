import React from "react"
import LoginForm from "../components/login/login_form"

class Login extends React.Component{
    state = {
        loginError : false
    }
    
    render() {
        return(
            <div className = "login-page">
                <div>
                    <p>LOGIN HEADER (TO DO)</p>
                    <LoginForm></LoginForm>
                </div>
                <button>new user? create new account</button><br></br>
                <p>FOOTER (TO DO)</p>
            </div>
        )
    }
}
export default Login