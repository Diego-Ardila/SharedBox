import React from 'react';
import Form from '../components/register/register_form';
import axios from 'axios';


class Register extends React.Component {
/*     state={
        user:{},
    } */
  /*   sendSubmition = (obj) =>{
        this.setState({ user : obj });
        axios
    } */
    render(){
        return(
            <div>
                <p>REGISTER HEADER (TO DO)</p>
                <Form sendSubmition={this.sendSubmition} />
                <p>REGISTER FOOTER (TO DO)</p>
            </div>
        )
    }
}

export default Register