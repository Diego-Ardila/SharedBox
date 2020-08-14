import React from 'react';
import axios from 'axios';

class Form extends React.Component {
    state={
        name:"",
        email:"",
        phoneNumber:"",
        password:"",
        v_password:"",
        passwordErr:false,
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
        this.setState({ [name] : value })
    }

    handleSubmit = (event) => {
        event.preventDefault();

        if(this.state.password===this.state.v_password){
            axios({
                url: "http://localhost:3001/posts",
                method: "POST",
                data: this.state,
            }) 
            .then(({data})=>{console.log(data); this.props.handleError(false)})
            .catch((err)=>{console.log(err) ; this.props.handleError(true)})

        }else {this.setState({passwordErr:true})}
        //this.props.sendSubmition(this.state);
        this.setState({
            name:"",
            email:"",
            phoneNumber:"",
            password:"",
            v_password:"",
            
        })
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
                    <input type="email" id={this.base.emailId} name={this.base.emailId} value={this.state.email} onChange={this.handleChange} />
                    <br/>
                </label>

                <label htmlFor={this.base.phoneId}>
                    User Phone Number:
                    <br/>
                    <input type="number" id={this.base.phoneId} name={this.base.phoneId} value={this.state.phoneNumber} onChange={this.handleChange} />
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
                    {this.state.passwordErr ? <p>Your passwords didn't match</p> : <p></p>}
                </label>
                <br/>
                <button>Send</button>
            </form>
        )
    }
}

export default Form