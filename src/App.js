import React, { Component } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { graphql } from "react-apollo";
import Config from "./Config";
import query from "./graphql/queries/SiteConfig";
import Navigation from "./components/navigation/Navigation";
import Routes from "./components/navigation/Routes";
import './App.scss';

class App extends Component {

  render() {

    if (this.props.data.loading) {
      return <div>Loading...</div>;
    }

    const siteConfig = this.props.data.readSiteConfig[0];

    return (
      <Router>
      <div className="app">
          <header className="app-header">
            <img src={Config.assetsBaseUrl + siteConfig.Logo.URL} className="app-logo" alt="logo" />
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

export default graphql(query)(App);