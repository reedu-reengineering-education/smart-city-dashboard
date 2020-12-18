import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Map from './pages/Map';
import Info from './pages/Info';
import './App.scss';

function App() {
  return (
    <Router>
      <Navbar></Navbar>

      {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
      <Switch>
        <Route path="/map" component={Map} />
        <Route path="/info" component={Info} />
        <Route path="/" component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
