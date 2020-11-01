import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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
import { changeLogin, changeTypeUser, changeUserName, changeUserPhoto, changeNotifications } from './actions/loginUser.actions'
import Space from "./pages/Space"
import PaymentResponse from './pages/PaymentResponse';
import { getNotificationUser} from './utils/HTTPrequests';
import TitleComponent from './TitleComponent'; 
import incomingReservations from './pages/incomingReservations'; 
import TenantSpaces from './components/adminTenant/tenantSpaces';
import swal from 'sweetalert';

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
  const [numberNotifications, setNumberNotifications] = useState(0)
  const dispatch = useDispatch()
  const isLogged = useSelector(state => state.loginUserReducer.isLogged)

  useEffect(() =>{
  const token = localStorage.getItem("token")  
  const typeUser = localStorage.getItem("typeUser")
  const userName = localStorage.getItem("userName")
  const userPhoto = localStorage.getItem("userPhoto")  
    if(token){
      dispatch(changeLogin(true))
    } else {
      dispatch(changeLogin(false))
    }
    if(typeUser){
      dispatch(changeTypeUser(typeUser))
    } 
    if(userName){
      dispatch(changeUserName(userName))
    } 
    if(userPhoto){
      dispatch(changeUserPhoto(userPhoto))
    }
    window.addEventListener("storage", e =>{
      if(e.key === "token"){
        if (localStorage.getItem("token")) {
          dispatch(changeLogin(true)) 
        } else {
          swal("Logged out", "You logged out from the application", "error").then((value) => dispatch(changeLogin(false))  )          
        }           
      }
      }
    );
  })

  useEffect(() =>{
    const fetchData = async () => {
      if (isLogged){
        const notifications = await getNotificationUser()
        dispatch(changeNotifications(notifications.data))
        setNumberNotifications(notifications.data.length)
      } else {
        dispatch(changeNotifications([]))
        setNumberNotifications(0)  
      }      
    }  
    fetchData();
  })

  const title = numberNotifications > 0 ? `(${numberNotifications})` : '';
  return (
    <Router>      
      <TitleComponent title={`${title} SharedBox`} />
      <Header />
      <div className="App">
        <Switch>
          <Route exact path="/lender/frequentAsked" component={frequentAsked} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/user/login" component={Login} />
          <Route exact path="/user/register/" component={register} />
          <PrivateRoute exact path="/lender/createSpace" component={PublishSpaceArea} typeUser="lender" />
          <PrivateRoute exact path="/tenant/admin" component={adminTenant} typeUser="tenant" />
          <PrivateRoute exact path="/tenant/reservations" component={incomingReservations} typeUser="tenant" />
          <PrivateRoute exact path="/tenant/spaces" component={TenantSpaces} typeUser="tenant" />
          <Route exact path="/space/" component={Space} />
          <PrivateRoute exact path="/user/profile" component={Profile} />
          <PrivateRoute exact path="/lender/admin" component={LenderAdminArea} typeUser="lender" />
          <PrivateRoute exact path="/user/logout" component={Logout} />
          <PrivateRoute exact path="/notification" component={Notification} />
          <PrivateRoute exact path="/response" component={PaymentResponse} />
          <Redirect from="*" to="/home" />
        </Switch>
      </div>
        <Footer />
    </Router>
  );
}

export default App;

