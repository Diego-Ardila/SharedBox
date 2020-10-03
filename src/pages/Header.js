import React, {useState} from 'react';
import { Navbar, Nav, Image, NavDropdown, Badge} from 'react-bootstrap';
import NotificationsNavbar from '../components/notification/notificationsNavbar'
import { BellFill} from 'react-bootstrap-icons';
import { NavLink } from 'react-router-dom';
import Logo from "../logo.svg";
import { useSelector, useDispatch } from "react-redux";
import { changeRendering, changeSpecificSearch } from '../actions/searchForm.actions'
import "./Header.css"

const Header = () => {
  const [expanded, setExpanded] = useState(false)
  const isLogged = useSelector(state => state.loginUserReducer.isLogged) 
  const typeUser = useSelector(state => state.loginUserReducer.typeUser)
  const userName = useSelector(state => state.loginUserReducer.userName)
  const userPhoto = useSelector(state => state.loginUserReducer.userPhoto)
  const notifications = useSelector(state => state.loginUserReducer.notifications)
  const dispatch = useDispatch()

  const homecoming =()=>{
    dispatch(changeRendering())
    dispatch(changeSpecificSearch())
  }  
  const handleClick = () => {
    document.body.click()
    setExpanded(false)
  }
  return (    
    <Navbar collapseOnSelect bg="primary" expand="lg" >      
      <NavLink to="/home" onClick={()=>homecoming()}><img src={Logo} alt="logo" width={100}/></NavLink>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse  id="responsive-navbar-nav">      
        <Nav className="ml-auto" > 
          { isLogged ? 
            <>      
              <NavLink to="/user/profile" className="nav-link"><Badge pill variant="dark">
               {typeUser ? typeUser.charAt(0).toUpperCase() + typeUser.slice(1) : null}
              </Badge>
              </NavLink>  
              {typeUser === "lender" ? <NavLink to="/lender/createSpace" className="nav-link mr-4">Create Space</NavLink> : null }
              <NavDropdown open={expanded} alignRight onClick={() => setExpanded(true)} onBlur={()=>setExpanded(true)} id="collasible-nav-dropdown" className="mr-4" title={<><BellFill size={25} /><Badge variant="light">{notifications.length}</Badge></>}>         
                <NotificationsNavbar notifications={notifications} onClick={handleClick} />                        
              </NavDropdown>         
              <Image src={userPhoto} width={50} height={50} roundedCircle fluid thumbnail />            
              <NavDropdown alignRight id="collasible-nav-dropdown" title={userName}>           
                <NavLink to="/user/profile" className="nav-link">Profile</NavLink>   
                <NavLink to={`/${typeUser}/admin`} className="nav-link">Admin</NavLink>
                <NavLink to={{pathname: "/user/logout",
                  fromMenu: true }} className="nav-link">Logout</NavLink> 
              </NavDropdown>       
            </>
          : 
            <>
            <NavLink to="/user/login" className="nav-link">Login</NavLink> 
            <NavLink to="/user/register" onClick={()=>localStorage.setItem("typeUser","lender")} className="nav-link">Be a Lender</NavLink>
            <NavLink to="/user/register" onClick={()=>localStorage.setItem("typeUser","tenant")} className="nav-link">Register</NavLink>  
            </>
          }

        
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;