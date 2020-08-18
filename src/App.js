import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import './App.css';
import Login from "./pages/Login";
import Profile from "./pages/Profile";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/lender/login" component={Login} />
          {/* <Route exact path="/lender/register/" component={register} /> */}
          <Route exact path="/lender/profile/:id" component={Profile} />
          <Redirect from="*" to="/lender/login" />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
