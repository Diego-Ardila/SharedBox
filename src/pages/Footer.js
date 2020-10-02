import React from 'react';
import { Navbar, Nav, OverlayTrigger, Tooltip, Button, Breadcrumb} from 'react-bootstrap';

const Footer = () => {
  return (
      <Navbar  collapseOnSelect bg="primary" expand="lg" fixed="bottom" >      
        <Navbar.Brand>Make it Real Top v6</Navbar.Brand>        
        <Nav className="ml-auto">
        <>
          <Breadcrumb>
          {[{name:'Diego Ardila', profile:"https://www.linkedin.com/in/diego-ardila-4a35751b0/"}, {name:'Diego Martínez', profile:"https://www.linkedin.com/in/diego-ricardo-martinez-forero/"},{name:'Donaldo Llanos', profile:"https://www.linkedin.com/in/donaldo-llanos-ter%C3%A1n/"}, {name:'Alex Guarín', profile:"https://www.linkedin.com/in/alexander-guarin-/"}].map((user) => (
            <OverlayTrigger
              key={user.name}
              placement="top"
              overlay={
                <Tooltip>
                  View Profile
                </Tooltip>
              }
            >
               <Breadcrumb.Item href={user.profile}>{user.name}</Breadcrumb.Item>
              
            </OverlayTrigger>
          ))}
          </Breadcrumb>
        </>
        </Nav>
      </Navbar>
  );
};

export default Footer;