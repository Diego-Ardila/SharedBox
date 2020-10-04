import React, {Component}  from 'react'
import ProfileForm from '../components/profile/ProfileForm';
import {Button, Container}from 'react-bootstrap'



class Profile extends Component{
    
    render(){
        return(
            <Container>
                {localStorage.getItem("typeUser") === "lender" ?
                <Container className="mt-4 p-2 text-center ">
                    <Button onClick ={()=>this.props.history.push('/lender/createSpace')} variant="primary">Create a new space</Button>                 
                </Container>:null}             
                <ProfileForm />
            </Container>
        )
    }
}
export default Profile