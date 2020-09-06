import React, {Component}  from 'react'
import ProfileForm from '../components/profile/ProfileForm';
import {Button, Container}from 'react-bootstrap'


class Profile extends Component{
    state = {
        data:{},
        error: '',
        typeUser : localStorage.getItem("typeUser")
    }   
    
    handleCreateButton = () => {
        this.props.history.push("/lender/createSpace")
    }

    handleBackHomeButton = () => {
        this.props.history.push("/tenant/admin")
    }

    render(){
        return(
            <Container>
                <h3>{this.state.error}</h3>
                <ProfileForm handleClick={this.handleClick} typeUser={this.state.typeUser}/>
                {this.state.typeUser === "lender" ?
                <Container className="p-2 text-center ">
                    <Button onClick ={this.handleCreateButton} variant="primary">Create a new space</Button>                 
                </Container>:null}             
            </Container>
        )
    }
}
export default Profile