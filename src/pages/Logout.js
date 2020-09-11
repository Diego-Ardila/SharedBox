import React from 'react';
import swal from 'sweetalert';
import {  useHistory } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { changeLogin } from '../actions/loginUser.actions'

const Logout = (props) => {
  const history = useHistory(); 
  const dispatch = useDispatch()  
  const logoutConfirmation = () => {
    swal({
      title: "Are you sure?", 
      text: "Do you want to logout?",
      buttons: {
        confirm: {
          text: "Confirm",
          value: "confirm"
        },
        cancel: "Cancel"        
      },
      dangerMode: true ,      
    }).then((value) => {
      switch(value){
        case "confirm":
          localStorage.removeItem('token');
          localStorage.removeItem('typeUser'); 
          dispatch(changeLogin(false))
          history.push('/home')
          swal("Good job","Logged Out Successfully", "success")
          break;
        default:
          history.goBack();          
      }
    })
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('typeUser')
    dispatch(changeLogin(false))
    history.push('/home')    
  }
  return (
    <div>
      {props.location.fromMenu ? logoutConfirmation() : logout()
       }
    </div>
  );
};

export default Logout;