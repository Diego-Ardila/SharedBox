import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, useHistory } from "react-router-dom";
//import './App.css';
import Login from "./pages/Login";
import Profile from "./pages/profile";
import register from "./pages/register"
import PublishSpaceArea from "./pages/PublishSpaceArea"
import LenderAdminArea from './pages/lenderAdminArea';
import Header from './pages/Header';
import Footer from './pages/Footer';
import Home from './pages/Home';
import ViewSpaces from './components/viewSpaces/ViewSpaces';

function PrivateRoute(props) {
  const history = useHistory()

  useEffect(() => {
    const token = localStorage.getItem("token")
    const isValid = true // an axios called to verify the token is required
    if(!token && isValid) history.push("/lender/login")
  }, [])

  return(
    <Route {...props}></Route>
  )
}

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route path="/viewSpaces" component={ViewSpaces} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/lender/login" component={Login} />
          <Route exact path="/lender/register/" component={register} />
          <PrivateRoute exact path="/lender/createSpace" component={PublishSpaceArea} />
          <PrivateRoute exact path="/lender/profile" component={Profile} />
          <PrivateRoute exact path="/lender/admin" component={LenderAdminArea} />
          <Redirect from="*" to="/home" />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

