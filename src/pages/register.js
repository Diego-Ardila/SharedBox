import React from 'react';
import Form from '../components/register/register_form';



class Register extends React.Component {
     state={
       // user:{},    para cuando necesite cambiar el estado desde Form
       error: ""
    } 
     /*sendSubmition = (obj) =>{
        this.setState({ user : obj });     para cuando necesite cambiar el estado desde Form
        axios
    } */

    handleError = (err) => {
        this.setState({ error: err})
    }
    render(){
        let {error} = this.state;
        return(
            <div>
                    <h4>{error}</h4> 
                <p>REGISTER HEADER (TO DO)</p>
                <Form history={this.props.history} handleError={this.handleError} />
                <p>REGISTER FOOTER (TO DO)</p>
            </div>
        )
    }
}

export default Register