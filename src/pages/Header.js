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
          
          { isLogged ? 
            <>
              <NavLink to="/user/profile" className="nav-link">Profile</NavLink>    
              <NavLink to="/lender/admin" className="nav-link">Admin Lender</NavLink>    
              <NavLink to="/tenant/admin" className="nav-link">Admin Tenant</NavLink>  
              <NavLink to="/lender/createSpace" className="nav-link">Create Space</NavLink> 
              <NavLink to="/user/logout" className="nav-link">Logout</NavLink>   
                               
            </> 
          : <>
            <NavLink to="/user/login" className="nav-link">Login</NavLink> 
            <NavLink to="/user/register" onClick={()=>localStorage.setItem("typeUser","lender")} className="nav-link">Be a Lender</NavLink>
            <NavLink to="/user/register" onClick={()=>localStorage.setItem("typeUser","tenant")} className="nav-link">Register</NavLink>  
          </>}          
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;