import React, {Component}  from 'react'
import ProfileForm from '../components/profile/ProfileForm';
import {Button, Container}from 'react-bootstrap'


class Profile extends Component{
    
    handleCreateButton = () => {
        this.props.history.push("/lender/createSpace")
    }
    
    render(){
        return(
            <Container>
                <h3>{this.state.error}</h3>
                <ProfileForm />
                {this.state.typeUser === "lender" ?
                <Container className="p-2 text-center ">
                    <Button onClick ={this.handleCreateButton} variant="primary">Create a new space</Button>                 
                </Container>:null}             
            </Container>
        )
    }
}
export default Profile