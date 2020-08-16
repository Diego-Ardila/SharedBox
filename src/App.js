import React from 'react';
import './App.css';
import Login from "./pages/Login"
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"



function App() {
  //const login = <Login></Login>
  return (
    <Router>
    <div className="App">
      <Switch>
        <Route exact path="/lender/login" component={Login} />
        {/* <Route exact path="/lender/register/" component={register} /> */}
        {/* <Route exact path="/lender/profile/:id" component={Something} /> */}
        {/* <Route path="*" component={Default} /> */}
        <Redirect from="*" to="/lender/login" />
      </Switch>
    </div>
    </Router>
  );
}

export default App;
