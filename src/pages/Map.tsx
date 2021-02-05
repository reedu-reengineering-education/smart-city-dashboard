import React from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import { RootStateOrAny, useSelector } from 'react-redux';
import styled from 'styled-components';
import SidebarComponent from '../components/MapComponents/SidebarComponent';
import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import MarkerCluster from '../components/MapComponents/MarkerCluster';

const Wrapper = styled.div`
  position: relative;
  height: calc(100% - 64px); // 100% minus navbar height
  width: 100%;

  .mapboxgl-popup {
    z-index: 1;
    pointer-events: none;
  }
`;

function Map() {
  const viewport = useSelector((state: RootStateOrAny) => state.map.viewport);
  const bbox = useSelector((state: RootStateOrAny) => state.map.bbox);

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
