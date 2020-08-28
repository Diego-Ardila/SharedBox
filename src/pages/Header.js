import React from 'react';
import { Navbar, Nav} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import Logo from "../logo.svg";

const Header = () => {
  return (
    <Navbar collapseOnSelect bg="primary" expand="lg">      
      <NavLink to="/home"><img src={Logo} alt="logo" width={100}/></NavLink>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link >Be a Lender</Nav.Link>
          <NavLink to="/lender/register" className="nav-link">Register</NavLink>
          <NavLink to="/lender/login" className="nav-link">Login</NavLink>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;