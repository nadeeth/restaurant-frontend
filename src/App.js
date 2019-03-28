import React, { Component } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import Navigation from "./components/navigation/Navigation";
import Routes from "./components/navigation/Routes";
import logo from './logo.svg';
import './App.scss';

class App extends Component {

  render() {
    return (
      <Router>
      <div className="app">
          <header className="app-header">
            <img src={logo} className="app-logo" alt="logo" />
            <Navigation></Navigation>
          </header>
          <div className="body">
            <Routes></Routes>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;