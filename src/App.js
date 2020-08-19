import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, useHistory } from "react-router-dom";
import './App.css';
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import register from "./pages/register"

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
        <Switch>
          <Route exact path="/lender/login" component={Login} />
          <Route exact path="/lender/register/" component={register} />
          <PrivateRoute exact path="/lender/profile" component={Profile} />
          <Redirect from="*" to="/lender/login" />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

