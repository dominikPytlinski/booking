import React, { Component, Fragment } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Events from './Pages/Events/Events';
import Auth from './Pages/Auth/Auth';
import MainNavigation from './Components/MainNavigation/MainNavigation';

import './App.css';

class App extends Component {
  render() {
    return (
      <Fragment>
        <BrowserRouter>
          <MainNavigation />
          <Route path="/events" component={Events} />
          <Route path="/login" component={Auth} />
        </BrowserRouter>
      </Fragment>
    )
  }
}

export default App
