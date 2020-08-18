import React, {Component}  from 'react'
import ProfileForm from '../components/profile/ProfileForm';
import DisplayProfile from '../components/profile/DisplayProfile';
import axios from 'axios';

class Profile extends Component{
    state = {
        showProfile: true,
        data:{}
    }
    componentDidMount = () => {    
    localStorage.setItem('Token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjNjMWI2MWI3NjlmOTJhM2M0MzdjNTgiLCJpYXQiOjE1OTc3NzQ3MDIsImV4cCI6MTU5Nzg2MTEwMn0.OVAPqPElwkbyZSnPAu8Cn8ii1b97iycDu2BKSgLPVsg')
        axios({
            method:"GET",
            url: "http://127.0.0.1:4000/lender/",
            headers:{
                Authorization: 'Bearer '+localStorage.getItem('Token')
            }
        })
        .then( response => {
            this.setState({
                data: response.data
                
            },()=>{console.log(this.state.data)})
        })
        .catch(error=>{
            console.dir(error)
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
                {this.state.showProfile ? <DisplayProfile data={this.state.data}/> : <ProfileForm data={this.state.data} handleClick={this.handleClick}/>}                
                {this.state.showProfile ? <button onClick={this.handleClick}>Editar Datos</button> : null}
                <p>footer to do </p>                
            </div>
        )
    }
}
export default Profile