import React from 'react';
import { Navbar, Nav} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const Footer = () => {
  return (
      <Navbar collapseOnSelect bg="primary" expand="lg" sticky="bottom">      
        <Navbar.Brand>Make it Real Top v6</Navbar.Brand>        
        <Nav className="ml-auto">
          Diego Ardila, Diego Martinez, Donaldo Llanos, Veilhelm Guarín
        </Nav>
      </Navbar>
  );
};

export default Footer;