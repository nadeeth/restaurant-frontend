import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import logo from './logo.svg';
import './App.scss';
import Config from "./Config";

class App extends Component {

  render() {

    if (this.props.data.loading) {
      return <div>Loading...</div>;
    }

    return (
      <Router>
      <div className="app">
        <header className="app-header">
          <img src={logo} className="app-logo" alt="logo" />
          <div className="main-menu">
            <nav>
              <ul>
                {this.renderMenu()}
              </ul>
            </nav>
          </div>
        </header>
        <div className="body">
          {this.renderRoutes()}
        </div>
      </div>
      </Router>
    );
  }

  renderMenu() {
    return this.props.data.readPages.map((page) => {
      return (
        <li key={page.ID}>
          <Link to={'/' + page.URLSegment + '/'}>{page.MenuTitle}</Link>
        </li>
      );
    });
  }

  renderRoutes() {
    return this.props.data.readPages.map((page) => {
      return (
        <Route key={page.ID} path={'/' + page.URLSegment + '/'} component={Config.pages[page.ClassName]} />
      );
    });
  }
}

const query = gql`
  query {
    readPages(ShowInMenus: true) {
      MenuTitle
      ID
      URLSegment
      ClassName
    }
  }
`;

export default graphql(query)(App);