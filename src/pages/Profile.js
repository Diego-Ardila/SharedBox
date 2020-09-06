import React, {Component}  from 'react'
import ProfileForm from '../components/profile/ProfileForm';
import DisplayProfile from '../components/profile/DisplayProfile';
import axios from 'axios';
import {Button, Container}from 'react-bootstrap'

class Profile extends Component{
    state = {
        showProfile: true,
        data:{},
        error: ''
    }

    componentDidMount = () => {        
        axios({
            method:"GET",
            url: "http://127.0.0.1:4000/lender/",
            headers:{
                Authorization: 'Bearer '+localStorage.getItem('token')
            }
        })
        .then( response => {
            this.setState({
                data: response.data                
            })
        })
        .catch(error=>{
            this.setState({
                error                
            })
        }) 
    }

    handleClick = (event) => {
        this.setState({
            showProfile: !this.state.showProfile
        })
    }   

    handleCreateButton = () => {
        this.props.history.push("/lender/createSpace")
    }
    render(){
        return(
            <Container >
                
                {this.state.showProfile ? 
                <Container className="container-fluid text-center"> 
                    <DisplayProfile data={this.state.data}/> 
                    <Button onClick={this.handleClick}>Edit profile</Button>
                </Container>:
                <ProfileForm data={this.state.data} handleClick={this.handleClick}/>}
                <Container className="p-2 text-center ">
                <Button onClick ={this.handleCreateButton} variant="primary">Create a new space</Button>                 
                </Container>                
            </Container>
        )
    }
}
export default Profile