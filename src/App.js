import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, useHistory } from "react-router-dom";
//import './App.css';
import { useDispatch } from "react-redux";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import register from "./pages/register"
import PublishSpaceArea from "./pages/PublishSpaceArea"
import LenderAdminArea from './pages/lenderAdminArea';
import frequentAsked from './pages/frequentAsked';
import adminTenant from './pages/adminTenant'
import Header from './pages/Header';
import Footer from './pages/Footer';
import Home from './pages/Home';
import Logout from './pages/Logout';
import Notification from './pages/notification'
import { changeLogin } from './actions/loginUser.actions'
import Space from "./pages/Space"
 

function PrivateRoute(props) {
  const history = useHistory()
  useEffect(() => {
    const token = props.typeUser ? false : localStorage.getItem("token")
    const typeUser = props.typeUser ? (props.typeUser === "lender" ? "lender" : "tenant") : true
    const typeValid = props.typeUser ? (localStorage.getItem("typeUser") === typeUser) : true
    const isValid = true // an axios called to verify the token is required
    if(!token && !typeValid && isValid) history.push("/user/login") 
  }, )

  return(
    <Route {...props}></Route>
  )
}  



function App() {
  const dispatch = useDispatch()

  useEffect(() =>{
  const token = localStorage.getItem("token")  
  if(token){
    dispatch(changeLogin(true))
  } else {
    dispatch(changeLogin(false))
  }
  })

  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/lender/frequentAsked" component={frequentAsked} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/user/login" component={Login} />
          <Route exact path="/user/register/" component={register} />
          <PrivateRoute exact path="/lender/createSpace" component={PublishSpaceArea} typeUser="lender" />
          <PrivateRoute exact path="/tenant/admin" component={adminTenant} typeUser="tenant" />
          <Route exact path="/space/" component={Space} />
          <PrivateRoute exact path="/user/profile" component={Profile} />
          <PrivateRoute exact path="/lender/admin" component={LenderAdminArea} typeUser="lender" />
          <PrivateRoute exact path="/user/logout" component={Logout} />
          <PrivateRoute exact path="/notification" component={Notification} /*typeUser={"lender"||"tenant"}*/ />
          <Redirect from="*" to="/home" />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

