import React, {Component}  from 'react'
import ProfileForm from '../components/profile/profile_from';
import DisplayProfile from '../components/profile/DisplayProfile';

class Profile extends Component{
    state = {
        showProfile: true
    }
    handleClick = (event) => {
        this.setState({
            showProfile: !this.state.showProfile
        })
    }
    render(){
        return(
            <div>
                {this.state.showProfile ? <DisplayProfile></DisplayProfile> : <ProfileForm></ProfileForm>}                
                <button onClick={this.handleClick}>{this.state.showProfile ? "Editar Datos" : "Ver Datos"}</button>                
            </div>
        )
    }
}
export default Profile