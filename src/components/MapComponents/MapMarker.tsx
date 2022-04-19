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
import React from 'react';

interface MapMarkerProps {
  color: 'blue' | 'green' | 'orange' | 'red';
  icon: JSX.Element;
  title?: string;
  details?: string;
}

const BaseMapMarker = styled.div`
  background-color: var(--scms-primary-blue);
  border-bottom-left-radius: 0.25rem;
  border-bottom-right-radius: 0.25rem;
  border: 1px solid white;
  width: 2rem;
  height: 2rem;
  color: white;
  box-shadow: var(--scms-box-shadow);
  font-weight: var(--scms-semi-bold);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: small;

  > svg {
    width: 2rem;
    pointer-events: none;
  }
`;

const BaseMarkerCard = styled.div<{ visible: boolean }>`
  display: ${(props) => (props.visible ? 'inherit' : 'none')};
  position: absolute;
  border-radius: 0.25rem;
  border: 1px solid white;
  background-color: var(--scms-dark-grey);
  width: max-content;
  padding: 2px;
`;

const MarkerTitleCard = styled(BaseMarkerCard)`
  bottom: 100%;
  text-align: center;
`;

const MapMarker = (props: MapMarkerProps) => {
  return (
    <BaseMapMarker>
      {props.icon}
      <MarkerTitleCard visible={true}>
        {props.title}
        <br />
        {props.details}
      </MarkerTitleCard>
    </BaseMapMarker>
  );
};

export default MapMarker;
