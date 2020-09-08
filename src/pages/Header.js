import React from 'react';
import { Navbar, Nav} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import Logo from "../logo.svg";
import { useSelector, useDispatch } from "react-redux";
import { changeRendering, changeSpecificSearch } from '../actions/searchForm.actions'





const Header = () => {
  const isLogged = useSelector(state => state.loginUserReducer.isLogged) 
  const dispatch = useDispatch()

  const homecoming =()=>{
    dispatch(changeRendering())
    dispatch(changeSpecificSearch())

  }

  return (
    <Navbar collapseOnSelect bg="primary" expand="lg">      
      <NavLink to="/home" onClick={()=>homecoming()}><img src={Logo} alt="logo" width={100}/></NavLink>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ml-auto">
          <NavLink to="/user/register" onClick={()=>localStorage.setItem("typeUser","lender")} className="nav-link">Be a Lender</NavLink>
          <NavLink to="/user/register" onClick={()=>localStorage.setItem("typeUser","tenant")} className="nav-link">Register</NavLink>  
          { isLogged ? 
            <>
              <NavLink to="/lender/profile" className="nav-link">Profile</NavLink>    
              <NavLink to="/lender/admin" className="nav-link">Admin</NavLink>    
              <NavLink to="/lender/createSpace" className="nav-link">Create Space</NavLink> 
              <NavLink to="/lender/logout" className="nav-link">Logout</NavLink>   
                               
            </> 
          : <NavLink to="/lender/login" className="nav-link">Login</NavLink> }          
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;