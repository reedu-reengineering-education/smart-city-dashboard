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

import React, { lazy, Suspense } from 'react';
import styled from 'styled-components';

const AnimatedNumber = lazy(() => import('./AnimatedNumber'));

export enum Status {
  good,
  warning,
  bad,
  dummy,
}

interface MeasurementTileProps {
  header: string;
  footer?: string;
  value: number;
  unit?: string;
  status?: Status;
  decimals?: number;
}

interface TileStyleProps {
  status?: Status;
}

const MeasurementContainer = styled.div<TileStyleProps>`
  background-color: ${(props) => {
    switch (props.status) {
      case Status.good:
        return 'var(--scms-green)';
      case Status.warning:
        return 'var(--scms-yellow)';
      case Status.bad:
        return 'var(--scms-red)';
      case Status.dummy:
        return 'lightgrey';
      default:
        return 'var(--scms-primary-blue)';
    }
  }};
  margin: 0.5rem;
  padding: 0.5rem;
  text-align: center;
  border-radius: 1rem;
  width: 9rem;
  height: 9rem;
  box-shadow: var(--scms-box-shadow);
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  justify-content: center;

  @media screen and (min-width: 769px) and (max-width: 960px) {
    width: 120px;
    height: 120px;
  }
`;

const TopText = styled.p`
  font-weight: var(--scms-semi-bold);
  hyphens: auto;
`;

const Value = styled.p`
  font-weight: var(--scms-semi-bold);
`;

/**
 * A tile component that displays a numeric value with optional footer, unit etc
 * @param props information about the tile itself
 * @returns Component with information passed in the props
 */
const MeasurementTile = (props: MeasurementTileProps) => {
  return (
    <MeasurementContainer status={props.status}>
      <TopText>{props.header}</TopText>
      <Value className="is-size-2">
        <Suspense fallback={<span>0</span>}>
          <AnimatedNumber
            value={Number(props.value)}
            decimals={props.decimals != null ? props.decimals : 1}
          />
        </Suspense>
        <wbr />
        <span className="is-size-5">{props.unit}</span>
      </Value>
      <p>{props.footer}</p>
    </MeasurementContainer>
  );
};

export default MeasurementTile;
