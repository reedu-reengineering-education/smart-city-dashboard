import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ComponentWrapper } from './styles';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DateContainer = styled.div`
  background-color: var(--scms-primary-blue);
  margin: 1rem;
  padding: 1rem;
  text-align: center;
  border-radius: 1rem;
  width: 9rem;
  height: 9rem;
  box-shadow: var(--scms-box-shadow);
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;

  @media screen and (min-width: 769px) and (max-width: 960px) {
    width: 120px;
    height: 120px;
  }
`;

const DateTimeSemiBold = styled.p`
  font-weight: var(--scms-semi-bold);
`;

export const DateTimeComponent = () => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    var timer = setInterval(() => setDate(new Date()), 1000);
    return function cleanup() {
      clearInterval(timer);
    };
  });

  return (
    <ComponentWrapper>
      <Container>
        <p className="is-size-5">Datum / Uhrzeit</p>
        <DateContainer>
          <DateTimeSemiBold className="is-size-2">
            {date.getDate()}
          </DateTimeSemiBold>
          <DateTimeSemiBold>
            {date.toLocaleString('default', { month: 'long' })}
          </DateTimeSemiBold>
          <DateTimeSemiBold>{date.getFullYear()}</DateTimeSemiBold>
        </DateContainer>
        <p>{date.toLocaleTimeString('de-DE')}</p>
      </Container>
    </ComponentWrapper>
  );
};
