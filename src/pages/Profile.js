import React, {Component}  from 'react'
import ProfileForm from '../components/profile/ProfileForm';
import {Button, Container}from 'react-bootstrap'


class Profile extends Component{
    
    render(){
        return(
            <Container>
                <ProfileForm/>
            </Container>
        )
    }
}
export default Profile