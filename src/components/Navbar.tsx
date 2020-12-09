import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  margin-bottom: 1rem;
`;

const Navbar = () => {
  const [mobileNav, toggleMobileNav] = useState(false);

  return (
    <Nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link to="/" className="navbar-item">
          <img
            alt="logo"
            src="https://bulma.io/images/bulma-logo.png"
            width="112"
            height="28"
          />
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
        </div>
      </div>
    </Nav>
  );
};

export default Navbar;
