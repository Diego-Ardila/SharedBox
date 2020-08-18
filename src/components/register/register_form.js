import React from 'react';
import axios from 'axios';


const emailRegex=/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

class Form extends React.Component {
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
    validate
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
      /*   if(this.state.submitError!=="") {
            //this.state.submitError="";
            this.setState({submitError : ""})
       } */
        if(this.state.password === this.state.v_password && emailRegex.test(this.state.email)){
            axios({
                url: "http://localhost:8000/lender/login",
                method: "POST",
                data: this.state,
            }) 
            .then(({data})=>{console.log(token); this.props.handleError(false)})
            .catch((err)=>{console.log(err) ; this.props.handleError(true)})

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
        //this.props.sendSubmition(this.state);
    }
    render(){
        return(
            <form onSubmit={this.handleSubmit} >
                <label htmlFor={this.base.nameId}>
                    User name:
                    <br/>
                    <input type="text" id={this.base.nameId} name={this.base.nameId} value={this.state.name} onChange={this.handleChange} />
                    <br/>
                </label>
                <label htmlFor={this.base.emailId}>
                    User E-mail:
                    <br/>
                    <input type="text" id={this.base.emailId} name={this.base.emailId} value={this.state.email} onChange={this.handleChange} />
                    <br/>
                </label>
                <label htmlFor={this.base.phoneId}>
                    User Phone Number:
                    <br/>
                    <input maxLength={13} type="tel" id={this.base.phoneId} name={this.base.phoneId} value={this.state.phoneNumber} onChange={this.handleChange} />
                    <br/>
                </label>
                <label htmlFor={this.base.passwordId}>
                    User Password:
                    <br/>
                    <input type="password" id={this.base.passwordId} name={this.base.passwordId} value={this.state.password} onChange={this.handleChange} />
                    <br/>
                </label>
                <label htmlFor={this.base.v_passwordId}>
                    validate Password:
                    <br/>
                    <input type="password" id={this.base.v_passwordId} name={this.base.v_passwordId} value={this.state.v_password} onChange={this.handleChange} />
                    <br/>
                         <p>{this.state.submitError}</p>
                </label>
                <br/>
                <button>Send</button>
            </form>
        )
    }
}
export default Form