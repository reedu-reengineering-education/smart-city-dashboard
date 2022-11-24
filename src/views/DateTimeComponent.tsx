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

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ComponentWrapper } from '../components/styles';

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

/**
 *
 * @returns A simple view to show the current date and time
 */
const DateTimeComponent = () => {
  const [date, setDate] = useState(new Date());

  // update the date and time each second
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

export default DateTimeComponent;
