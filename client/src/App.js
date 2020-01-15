import React, { Component, Fragment } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Events from './Pages/Events/Events';
import MainNavigation from './Components/MainNavigation/MainNavigation';

import './App.css';

class App extends Component {
  render() {
    return (
      <Fragment>
        <BrowserRouter>
          <MainNavigation />
          <Route path="/" component={Events} />
        </BrowserRouter>
      </Fragment>
    )
  }
}

export default App
