import React from 'react';
import styled from 'styled-components';
import { ComponentWrapper } from '../components/styles';

import logo from './../resources/clouds-white.jpg';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LogoContainer = styled.div`
  background-color: var(--scms-primary-blue);
  margin: 1rem;
  padding: 1rem;
  text-align: center;
  border-radius: 1rem;
  width: 9rem;
  height: 9rem;
  box-shadow: var(--scms-box-shadow);

  @media screen and (min-width: 769px) and (max-width: 960px) {
    width: 120px;
    height: 120px;
  }
`;

const Logo = styled.img`
  max-height: 100%;
  width: auto;
`;

const LogoComponent = () => (
  <ComponentWrapper>
    <Container>
      <p className="is-size-5">Smart City</p>
      <LogoContainer>
        <Logo src={logo} alt="Smart City Münster Logo"></Logo>
      </LogoContainer>
      <p>Münster</p>
    </Container>
  </ComponentWrapper>
);

export default LogoComponent;
