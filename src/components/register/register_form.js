import React from 'react';

class Form extends React.Component {
    state={
        name:"",
        email:"",
        phoneNumber:"",
        password:""
    }

    base={
        nameId:"name",
        emailId:"email",
        phoneId:"phoneNumber",
        passwordId:"password"
    }

    handleChange= (event) => {
        const { name , value } = event.target

        this.setState({[name] : value})
    }

    handleSubmit = (event) => {
        event.preventDefault();
        
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
                <br/>
                <button>Send</button>
            </form>
        )
    }
}

export default Form