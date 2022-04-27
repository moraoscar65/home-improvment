'use strict';

import React, { Component } from 'react';
import Home from '../pages/home/home';
import 'bootstrap/dist/css/bootstrap.min.css';

//css
require('style-loader!./App.css');

class App extends Component {
  render() {
    return (
      <Home/>
    );
  }
}

export default App;