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
  width: 150px;
  height: 150px;
  box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1),
    0 0px 0 1px rgba(10, 10, 10, 0.02);
`;

const Logo = styled.img`
  max-height: 100%;
  width: auto;
`;

export const LogoComponent = () => (
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
