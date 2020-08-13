import React from 'react';
import './App.css';
import Login from "./pages/Login"
import Register from "./pages/register"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"



function App() {
  return (
    <Router>
    <div className="App">
      <Login></Login>
      <Register/>
    </div>
    </Router>
  );
}

export default App;
