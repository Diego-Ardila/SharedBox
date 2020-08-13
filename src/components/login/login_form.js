import React, {useState} from "react"
//import axios from "axios"

const base = {
    emailID: "login-email",
    passwordId: "login-password",
    formId: "login-form",
    submitId: "login-submit"
}

function LoginForm () {
    let [email, setEmail] = useState("")
    let [password, setPassword] = useState("")

    const handleChange = (event) => {
            if(event.target.id === base.emailID ) setEmail(email = event.target.value)
            if(event.target.id === base.passwordId ) setPassword(password = event.target.value)
        }   
    
    const handleSubmit = (event) => {
         event.preventDefault()
         
    }    

    return (
        <div>
            <form className = {base.formId} onSubmit = {handleSubmit}>
                <label htmlFor={base.emailID}>
                    EMAIL:
                    <br></br>
                    <input type ="email" id={base.emailID} placeholder="me@email.com" onChange ={handleChange}></input>
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