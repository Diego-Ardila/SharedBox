import React from 'react';
import  NotificationNavbar from './notificationNavbar';
import {NavDropdown} from 'react-bootstrap';
import { ChevronDoubleDown } from 'react-bootstrap-icons';
import {NavLink} from 'react-router-dom';

function NotificationsNavbar({ notifications }) {
  let style = notifications.length > 3 ? {height: '70vh', overflowX: 'hidden'} : {};
  let showNotifs = notifications.length > 0 ? notifications.reverse().map(notification => (
    <NotificationNavbar key={notification._id} notification={notification} />
  )) : <h6 className="text-center">There are no notifications</h6>
  return (
    <>
      <div style={style}>
        <h3 className="ml-2 mr-2">Notifications</h3>
        <NavDropdown.Divider />
        {showNotifs} 
      </div>
      <NavDropdown.Divider />
      <NavLink to="/notification" className="nav-link text-center"><ChevronDoubleDown size={40} /></NavLink> 
    </>
  )
}

export default NotificationsNavbar;