import React from 'react';
import './App.css';
import Login from "./pages/Login"
import Profile from "./pages/profile"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import profileForm from './components/profile/profile_from';



function App() {
  return (
    <Router>
    <div className="App">           
      <Profile></Profile>
    </div>
    </Router>
  );
}

export default App;
