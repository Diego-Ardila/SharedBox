import React from 'react';
import RegisterForm from '../components/register/RegisterForm';



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
<<<<<<< Updated upstream
                    <h4>{error}</h4> 
                <RegisterForm history={this.props.history} handleError={this.handleError} />
=======
                <Form history={this.props.history} handleError={this.handleError} />
>>>>>>> Stashed changes
            </div>
        )
    }
}

export default Register