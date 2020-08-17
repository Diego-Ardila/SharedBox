import React from 'react';
import './App.css';
import Login from "./pages/Login"
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"



function App() {
  return (
    <Router>
    <div className="App">
      <Switch>
        <Route exact path="/lender/login" component={Login} />
        {/* <Route exact path="/lender/register/" component={register} /> */}
        {/* <Route exact path="/lender/profile/:id" component={Something} /> */}
        <Redirect from="*" to="/lender/login" />
      </Switch>
    </div>
    </Router>
  );
}

export default App;
