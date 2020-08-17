import React, {Component}  from 'react'
import ProfileForm from '../components/profile/profile_from';
import DisplayProfile from '../components/profile/DisplayProfile';
import axios from 'axios';

class Profile extends Component{
    state = {
        showProfile: true,
        data:{}
    }

    componentDidMount = () => {
        
        axios.get("http://localhost:3001/user")
        .then(response=>{
            this.setState({
                data: response.data
            })
        })
        .catch(error=>{
            console.log(error)
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
                {this.state.showProfile ? <DisplayProfile data={this.state.data}/> : <ProfileForm data={this.state.data}/>}                
                {this.state.showProfile ? <button onClick={this.handleClick}>Editar Datos</button> : null}
                <p>footer to do </p>                
            </div>
        )
    }
}
export default Profile