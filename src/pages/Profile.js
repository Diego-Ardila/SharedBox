import React, {Component}  from 'react'
import ProfileForm from '../components/profile/ProfileForm';
import {Button, Container}from 'react-bootstrap'


class Profile extends Component{
    
    render(){
        return(
            <Container>
                {localStorage.getItem("typeUser") === "lender" ?
                <Container className="p-2 text-center ">
                    <Button onClick ={this.handleCreateButton} variant="primary">Create a new space</Button>                 
                </Container>:null}             
                <ProfileForm />
            </Container>
        )
    }
}
export default Profile