import React from 'react';
import './App.css';
import Login from "./pages/Login"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"



function App() {
  return (
    <Router>
    <div className="App">
      <Login></Login>
    </div>
    </Router>
  );
}

export default App;
