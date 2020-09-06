import React from "react"
import LoginForm from "../components/login/LoginForm"
import { Container } from "react-bootstrap";

class Login extends React.Component{  
    render() {
        return(
            <Container sm={12}>
                <LoginForm ></LoginForm>
            </Container>
        )
    }
}
export default Login