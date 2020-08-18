import React, {useState} from "react"
import axios from "axios"

const base = {
    emailId: "login-email",
    passwordId: "login-password",
    formClass: "login-form",
    submitId: "login-submit"
}

function LoginForm (props) {

    let [email, setEmail] = useState("")
    let [password, setPassword] = useState("")

    const handleChange = (event) => {
            if(event.target.id === base.emailId ) setEmail(email = event.target.value)
            if(event.target.id === base.passwordId ) setPassword(password = event.target.value)
        }  

    const clearFields = (arrFields = []) => {
        arrFields.forEach(field => document.getElementById(field).value ="")
    }
    
    const clearState = () => {
        setEmail(email ="")
        setPassword(password ="")
    }
    
    const handleSubmit = async (event) =>  {
        event.preventDefault()
        try{
            const token = await axios({
                 method:"POST",
                 url: "http://127.0.0.1:4000/lender/login",
                 data:{
                     email,
                     password
                 }
             })
             console.log(token)
        }catch(error) {
            props.handleErrorLogin(error.response.data)
            clearFields([base.emailId, base.passwordId])
            clearState()
            document.getElementById(base.emailId).focus()
        }   
    }

    return (
        <div>
            <form className = {base.formClass} onSubmit = {handleSubmit}>
                <label htmlFor={base.emailId}>
                    EMAIL:
                    <br></br>
                    <input type ="email" id={base.emailId} placeholder="me@email.com" onChange ={handleChange}></input>
                    <br></br>
                </label>
                <label htmlFor={base.passwordId}>
                    PASSWORD:
                    <br></br>
                    <input type ="password" id={base.passwordId} placeholder="password" onChange ={handleChange}></input>
                    <br></br>
                    <br></br>
                </label>
                <input type="submit" id={base.submitId} value="submit"></input>
            </form>
        </div>
    )
}
export default LoginForm