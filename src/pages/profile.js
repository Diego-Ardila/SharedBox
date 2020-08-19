import React, {Component}  from 'react'
import ProfileForm from '../components/profile/ProfileForm';
import DisplayProfile from '../components/profile/DisplayProfile';
import axios from 'axios';

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
    componentDidUpdate = () => {        
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

    render(){
        return(
            <div>
                <p>header to do </p>
                {this.state.showProfile ? 
                <div>
                    <DisplayProfile data={this.state.data}/> <button onClick={this.handleClick}>Editar Datos</button> 
                </div> :
                 <ProfileForm data={this.state.data} handleClick={this.handleClick}/>}                    
                <p>footer to do </p>                
            </div>
        )
    }
}
export default Profile