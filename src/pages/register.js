import React from 'react';
import Form from '../components/register/register_form';



class Register extends React.Component {
     state={
       // user:{},    para cuando necesite cambiar el estado desde Form
       error: false
    } 
     /*sendSubmition = (obj) =>{
        this.setState({ user : obj });     para cuando necesite cambiar el estado desde Form
        axios
    } */

    handleError = (boo) => {
        this.setState({ error: boo })
    }
    render(){
        let {error} = this.state;
        return(
            <div>
                 {error ? <h2>Ups!! there is a problem with the server</h2> : <p></p> }
                <p>REGISTER HEADER (TO DO)</p>
                <Form handleError={this.handleError} />
                <p>REGISTER FOOTER (TO DO)</p>
            </div>
        )
    }
}

export default Register