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
  width: 150px;
  height: 150px;
  box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1),
    0 0px 0 1px rgba(10, 10, 10, 0.02);
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
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
          <p className="is-size-2">{date.getDate()}</p>
          <p>
            <b>{date.toLocaleString('default', { month: 'long' })}</b>
          </p>
          <p>
            <b>{date.getFullYear()}</b>
          </p>
        </DateContainer>
        <p>{date.toLocaleTimeString('de-DE')}</p>
      </Container>
    </ComponentWrapper>
  );
};
