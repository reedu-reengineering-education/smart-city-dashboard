import React from 'react';
import styled from 'styled-components';
import { ComponentWrapper } from './styles';

import msLogo from '../resources/rathauslogo.svg';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LogoContainer = styled.div`
  background-color: var(--scms-primary-blue);
  margin: 1rem;
  padding: 2rem;
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
      <p className="is-size-5">Stadt</p>
      <LogoContainer>
        <Logo src={msLogo}></Logo>
      </LogoContainer>
      <p>Münster</p>
    </Container>
  </ComponentWrapper>
);

export default LogoComponent;
