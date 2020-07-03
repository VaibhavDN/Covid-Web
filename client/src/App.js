import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter as Router, Route} from "react-router-dom";

import Navbar from './components/navbar.components';
import CityList from './components/citylist.components';
import CovidInfo from './components/covidinfo.components';
import Visualize from './components/visualize.component';

function App() {
  return (
    <Router>
      <Navbar/>
      <Route path="/" exact component={CovidInfo} />
      <Route path="/citylist" component={CityList} />
      <Route path="/visualize" component={Visualize} />
    </Router>
  );
}

export default App;
