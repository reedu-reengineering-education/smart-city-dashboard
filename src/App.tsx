import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Map from './pages/Map';
import Info from './pages/Info';
import Transition from './components/Transition';
import './App.scss';

function App() {
  return (
    <Router>
      <Navbar></Navbar>
      <AnimatedRoutes></AnimatedRoutes>
    </Router>
  );
}

const AnimatedRoutes = () => {
  let location = useLocation();

  return (
    <Transition location={location.key}>
      <Switch location={location}>
        <Route path="/map" component={Map} />
        <Route path="/info" component={Info} />
        <Route path="/" component={Home} />
      </Switch>
    </Transition>
  );
};

export default App;
