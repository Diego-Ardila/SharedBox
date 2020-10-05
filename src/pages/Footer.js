import React from 'react';
import { Navbar, Nav, OverlayTrigger, Tooltip, Breadcrumb} from 'react-bootstrap';

const Footer = () => {
  return (
      <Navbar style={{height:"10vh"}} collapseOnSelect bg="primary" expand="md"  >  
        <Navbar.Toggle style={{fontSize:"1rem", border:"none", outline:"none"}}>
        <Navbar.Brand style={{fontSize:"1rem"}}>Make it Real Top v6</Navbar.Brand> 
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
                <a className="m-1" href={user.profile}>{user.name} /</a>             
              </OverlayTrigger>
            ))}
        </Navbar.Toggle>
        <Navbar.Collapse>
          <Navbar.Brand>Make it Real Top v6</Navbar.Brand>        
          <Nav className="ml-auto">
          <>
            <Breadcrumb style={{marginBottom:"none"}}>
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
        </Navbar.Collapse>  
      </Navbar>
  );
};

export default Footer;