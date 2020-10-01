import React,{Component} from 'react'
import NotificationCenter from '../components/notification/notificationCenterView'


class Notification extends Component{        
    render(){
        return(            
                <NotificationCenter navbarId={this.props.location.navbarId}/>        
        )}

}
export default Notification