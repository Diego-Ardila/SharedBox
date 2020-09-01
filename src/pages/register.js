import React from 'react';
import RegisterForm from '../components/register/RegisterForm';



class Register extends React.Component {
     state={
       error: ""
    } 

    handleError = (err) => {
        this.setState({ error: err})
    }
    render(){
        let {error} = this.state;
        return(
            <div>
                    <h4>{error}</h4> 
                <RegisterForm history={this.props.history} handleError={this.handleError} />
            </div>
        )
    }
}

export default Register