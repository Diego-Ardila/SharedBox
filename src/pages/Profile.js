import React, {Component}  from 'react'
import ProfileForm from '../components/profile/ProfileForm';
import DisplayProfile from '../components/profile/DisplayProfile';
import {Button, Container}from 'react-bootstrap'
import {getDataUser}from '../utils/HTTPrequests'

class Profile extends Component{
    state = {
        showProfile: false,
        data:{},
        error: '',
        typeUser : localStorage.getItem("typeUser")
    }

    componentDidMount = async () => {
        try{
            const userData = await getDataUser(localStorage.getItem("typeUser"))
            this.setState({
                data:userData.data
            })
        }catch(error){
            this.setState({
                error : error.response.data
            })
        }
    }

    handleClick = (event) => {
        this.setState({
            showProfile: !this.state.showProfile
        })
    }   

    handleCreateButton = () => {
        this.props.history.push("/lender/createSpace")
    }
    handleBackHomeButton = () => {
        this.props.history.push("/tenant/admin")
    }

    render(){
        return(
            <Container >
                <h3>{this.state.error}</h3>
                {this.state.showProfile ? 
                <Container className="container-fluid text-center"> 
                    <DisplayProfile data={this.state.data} typeUser={this.setState.typeUser}/> 
                    <Button onClick={this.handleClick}>Edit profile</Button>
                </Container>:
                <ProfileForm data={this.state.data} handleClick={this.handleClick} typeUser={this.state.typeUser}/>}
                {this.state.typeUser === "lender" ?
                <Container className="p-2 text-center ">
                    <Button onClick ={this.handleCreateButton} variant="primary">Create a new space</Button>                 
                </Container>:<Container className="p-2 text-center ">
                    <Button onClick ={this.handleBackHomeButton} variant="primary">Back home</Button>                 
                </Container>}               
            </Container>
        )
    }
}
export default Profile