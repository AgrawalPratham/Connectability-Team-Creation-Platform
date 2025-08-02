import React from 'react';

import {
  BrowserRouter as Router,
} from "react-router-dom";

import AuthWrapper from './Auth/AuthWrapper.js'


function App() {
  return (
    <Router>
      <div className="App">
        < AuthWrapper />
      </div>
    </Router>
  );
}

export default App;
