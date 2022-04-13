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

import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import logo from './../resources/smart-city-ms-logo.png';
import stadtMs from './../resources/stadtlogo_A4.jpg';
import MMarke from './../resources/mmarke_de_A4.jpg';

const Nav = styled.nav`
  .navbar-brand > .navbar-item {
    padding: 0;

    > img {
      height: 4rem;
      max-height: unset;
    }
  }

  .navbar-burger {
    height: auto;
  }
`;

const Logo = styled.img`
  padding: 0.75rem;
`;

const Navbar = () => {
  const [mobileNav, toggleMobileNav] = useState(false);

  return (
    <Nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link to="/" className="navbar-item">
          <Logo alt="logo" src={logo} height="50px" />
        </Link>

        <div
          role="button"
          className="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
          onClick={() => toggleMobileNav(!mobileNav)}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </div>
      </div>

      <div className={`navbar-menu ${mobileNav ? 'is-active' : ''}`}>
        <div className="navbar-start">
          <Link to="/map" className="navbar-item">
            Karte{' '}
          </Link>
          <Link to="/info" className="navbar-item">
            Info{' '}
          </Link>
        </div>
        <div className="navbar-end">
          <a href="https://www.stadt-muenster.de/" className="navbar-item">
            <img alt="logo" src={MMarke} height="50px" />
          </a>
          <a href="https://www.stadt-muenster.de/" className="navbar-item">
            <img alt="logo" src={stadtMs} height="50px" />
          </a>
        </div>
      </div>
    </Nav>
  );
};

export default Navbar;
