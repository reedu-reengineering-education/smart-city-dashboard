import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import logo from './../resources/smart-city-ms-logo.jpg';

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

const Navbar = () => {
  const [mobileNav, toggleMobileNav] = useState(false);

  return (
    <Nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link to="/" className="navbar-item">
          <img alt="logo" src={logo} height="50px" />
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
      </div>
    </Nav>
  );
};

export default Navbar;
