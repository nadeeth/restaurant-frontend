import React, { Component } from 'react';
import { HashRouter as Router } from "react-router-dom";
import { graphql } from "react-apollo";
import Config from "./config/Config";
import ConfigContext from "./config/ConfigContext";
import query from "./graphql/queries/SiteConfig";
import Navigation from "./components/navigation/Navigation";
import Routes from "./components/navigation/Routes";
import Loading from './components/loading/Loading';
import Outage from './components/outage/Outage';
import './App.scss';

class App extends Component {

  render() {

    if (this.props.data.error) {
      return <Outage />;
    }

    if (this.props.data.loading) {
      return <Loading />;
    }

    const siteConfig = this.props.data.readSiteConfig[0];

    return (
      <Router>
        <ConfigContext.Provider value={siteConfig}>
          <div className="app">
            <header className="app-header">
              {this.renderLogo(siteConfig.Logo.URL, siteConfig.Title)}
              <Navigation></Navigation>
            </header>
            <Routes></Routes>
          </div>
        </ConfigContext.Provider>
      </Router>
    );
  }

  renderLogo(logo, title) {
    return (
      <a href="/">
        {logo ? (
          <img src={Config.assetsBaseUrl + logo} className="image-logo" alt="logo" />
        ) : (
          <span className="text-logo">{title}</span>
        )}
      </a>
    );
  }
}

export default graphql(query)(App);