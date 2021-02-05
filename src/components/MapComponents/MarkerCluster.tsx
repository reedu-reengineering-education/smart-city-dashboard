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
