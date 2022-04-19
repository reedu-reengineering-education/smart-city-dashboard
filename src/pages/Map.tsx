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

import React, { useEffect, useState } from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import styled from 'styled-components';
import SidebarComponent from '../components/MapComponents/SidebarComponent';
import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet';
import Leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import MarkerCluster from '../components/MapComponents/MarkerCluster';
import { TIMEOUT } from '../components/Transition';

const Wrapper = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
`;

function Map() {
  const viewport = useSelector((state: RootStateOrAny) => state.map.viewport);
  const bbox = useSelector((state: RootStateOrAny) => state.map.bbox);

  const [map, setMap] = useState<Leaflet.Map>();

  useEffect(() => {
    if (map) {
      setTimeout(() => {
        map.invalidateSize();
      }, TIMEOUT);
    }
  }, [map]);

  return (
    <Wrapper>
      <MapContainer
        center={[viewport.latitude, viewport.longitude]}
        zoom={viewport.zoom}
        maxBounds={bbox}
        maxBoundsViscosity={1.0}
        minZoom={12}
        scrollWheelZoom={true}
        style={{ width: '100%', height: '100%' }}
        zoomControl={false}
        whenCreated={(map: Leaflet.Map) => setMap(map)}
      >
        <ZoomControl position="topright"></ZoomControl>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://geo.stadt-muenster.de/basiskarte/{z}/{x}/{y}.png"
        />

        <MarkerCluster />
      </MapContainer>
      <SidebarComponent></SidebarComponent>
    </Wrapper>
  );
}

export default Map;
