import React from 'react';
import swal from 'sweetalert';
import {  useHistory } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { changeLogin } from '../actions/loginUser.actions'

const Logout = () => {
  const history = useHistory(); 
  const dispatch = useDispatch()
  const execAlert = () => {
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
          dispatch(changeLogin(false))
          history.push('/home')
          swal("Good job","Logged Out Successfully", "success")
          break;
        default:
          history.goBack();
          
      }
    });
  }
  return (
    <div>
      {execAlert()}
    </div>
  );
};

export default Logout;