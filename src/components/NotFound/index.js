import React, { Component } from 'react';
import logo from './logo.svg';
import './style.css';

class NotFound extends Component {
  render() {
    return (
      <div className="not-found">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Error 404!!</h1>
        </header>
        <p className="App-intro">
          Sorry Page Not Found, Please Try another link.
        </p>
      </div>
    );
  }
}

export default NotFound;
