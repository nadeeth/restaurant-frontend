import React, { Component } from 'react';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import Config from "./Config";
import logo from './logo.svg';
import './App.scss';
import Menu from './components/menu/Menu';

class App extends Component {
  render() {

    const client = new ApolloClient({
      uri: Config.apiBaseUrl
    });

    return (
      <ApolloProvider client={client}>
        <div className="app">
          <header className="app-header">
            <img src={logo} className="app-logo" alt="logo" />
            <Menu />
          </header>
          <div className="body">
            <h1>Body</h1>
          </div>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
