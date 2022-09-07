/**
 * Smart City Münster Dashboard
 * Copyright (C) 2022 Reedu GmbH & Co. KG
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

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

// router with animated page transitions
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
