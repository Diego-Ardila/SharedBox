import React from 'react';
import RegisterForm from '../components/register/RegisterForm';

class Register extends React.Component {
     state={
       error: "",
       typeUser : localStorage.getItem("typeUser")||"tenant"
    } 

    handleError = (err) => {
        this.setState({ error: err})
    }
    render(){
        return(
            <div>
                <h4>{this.state.error}</h4> 
                <RegisterForm history={this.props.history} handleError={this.handleError} typeUser={this.state.typeUser} />
            </div>
        )
    }
}
export default Register