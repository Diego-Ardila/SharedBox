import React, {useState, useRef} from "react"
import axios from "axios"
import styled from "styled-components"

const InputField = styled.input`
    width: 310px;
    height: 43px;
    left: 455px;
    top: 682px;
    background: #318FB5;
    opacity: 0.4;
    border-radius: 40px;
    text-align: center;
    outline: none;
    color: #001244;
    font-weight: bold;
    :focus {
        box-shadow: 0 0 4pt 4pt #B0CAC7;
        opacity: 0.7;
    }
    &:hover {
        box-shadow: 0 0 3pt 2pt #B0CAC7;
        opacity: 0.7;
    }
`

const LoginBotton = styled.button`
    background: #001244;
    border-radius: 40px;
    width: 155px;
    height: 43px;
    font-family: Montserrat;
    font-style: normal;
    font-weight: bold;
    line-height: 24px;
    text-align: center;
    color: #FFF9F4;
    outline:none;
    &:hover {
        width: 153px;
        height: 46px;
        cursor: pointer;
    }
`

const base = {
    emailId: "login-email",
    passwordId: "login-password",
    formClass: "login-form",
    submitId: "login-submit"
}

function LoginForm (props) {

    let [email, setEmail] = useState("")
    let [password, setPassword] = useState("")
    
    const emailInput = useRef()
    const passwordInput = useRef()

    const handleChange = (event) => {
            if(event.target.id === base.emailId ) setEmail(email = event.target.value)
            if(event.target.id === base.passwordId ) setPassword(password = event.target.value)
        }  

    const clearFields = (arrFields = []) => {
        arrFields.forEach(field => field.current.value ="")
    }
    
    const clearState = () => {
        setEmail(email ="")
        setPassword(password ="")
    }

    const setFocus = () => {
        emailInput.current.focus()
    }
    
    const handleSubmit = async (event) =>  {
        event.preventDefault()
        try{
            const response = await axios({
                 method:"POST",
                 url: "http://127.0.0.1:4000/lender/login",
                 data:{
                     email,
                     password
                 }
             })
             localStorage.setItem("token", response.data)
             props.history.push("/lender/profile")
        }catch(error) {
            console.dir(error)
            let errMessage
            if(error.status === 400) errMessage = error.response.data
            if(error.message === "Network Error") errMessage ="failed connection to dataServer, check your connection to the internet and try again later" 
            props.handleErrorLogin(errMessage)
            clearFields([emailInput, passwordInput])
            clearState()
            setFocus()
        }   
    }

    return (
        <div>
            <form className = {base.formClass} onSubmit = {handleSubmit}>
                <label htmlFor={base.emailId}>
                    EMAIL:
                    <br></br>
                    <InputField type ="email" ref={emailInput} id={base.emailId}  placeholder="me@email.com" onChange ={handleChange}></InputField>
                    <br></br>
                </label>
                <label htmlFor={base.passwordId}>
                    PASSWORD:
                    <br></br>
                    <InputField type ="password" ref={passwordInput} id={base.passwordId}  placeholder="password" onChange ={handleChange}></InputField>
                    <br></br>
                    <br></br>
                </label>
                <LoginBotton type="submit" id={base.submitId} value="submit">LOGIN</LoginBotton>
            </form>
        </div>
    )
}
export default LoginForm