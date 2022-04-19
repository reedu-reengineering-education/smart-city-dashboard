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

import React from 'react';
import L from 'leaflet';
import 'leaflet.markercluster/dist/leaflet.markercluster';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import { renderToStaticMarkup } from 'react-dom/server';
import styled from 'styled-components';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import AaseeMarker from './AaseeMarker';
import { useSelector, RootStateOrAny } from 'react-redux';
import BicycleMarker from './BicycleMarker';
import ParkingMarker from './ParkingMarker';
import PedestrianMarker from './PedestrianMarker';
import WeatherMarker from './WeatherMarker';

const DefaultMapMarker = styled.div`
  background-color: var(--scms-primary-blue);
  border-radius: 50%;
  border: 1px solid white;
  width: 2rem;
  height: 2rem;
  color: white;
  box-shadow: var(--scms-box-shadow);
  font-weight: var(--scms-semi-bold);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const createClusterCustomIcon = function (cluster: any) {
  return L.divIcon({
    html: renderToStaticMarkup(
      <DefaultMapMarker>{cluster.getChildCount()}</DefaultMapMarker>
    ),
    className: '',
    iconSize: L.point(40, 40, true),
  });
};

const MarkerCluster = () => {
  const features = useSelector((state: RootStateOrAny) => state.map.features);

  return (
    <MarkerClusterGroup
      spiderfyDistanceMultiplier={3}
      iconCreateFunction={createClusterCustomIcon}
    >
      {features.opensensemap && <WeatherMarker></WeatherMarker>}
      {features.aasee && <AaseeMarker></AaseeMarker>}
      {features.bicycle && <BicycleMarker></BicycleMarker>}
      {features.parking && <ParkingMarker></ParkingMarker>}
      {features.pedestrians && <PedestrianMarker></PedestrianMarker>}
    </MarkerClusterGroup>
  );
};

export default MarkerCluster;
