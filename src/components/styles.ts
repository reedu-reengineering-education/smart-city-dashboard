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

import styled from 'styled-components';

export const ComponentWrapper = styled.div`
  background: linear-gradient(135deg, rgba(255, 255, 255, 0), #f0f0f0);
  border-radius: 1rem;
  width: 100%;
  min-height: 250px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

export const WidgetIcon = styled.div`
  > svg {
    width: 4.5rem;
    height: 4.5rem;
    margin: -1rem;
    margin-right: -0.5rem;
    margin-bottom: -1.5rem;
    fill: var(--scms-primary-blue);
    opacity: 0.3;
  }
`;

export const HeadingWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const TilesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  height: 100%;
  align-items: center;
`;

export const ChartWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

export const FooterWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
`;
