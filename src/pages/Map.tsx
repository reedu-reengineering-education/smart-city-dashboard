import ReactMapGL from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { updateMapViewport } from '../actions/map';
import React, { useState } from 'react';
import styled from 'styled-components';

import {
  Humidity,
  Pressure,
  Temperature,
  WaterTemperature,
  PH,
  CarParking,
  Bicycle,
  Pedestrian,
} from '../components/Icons';
import MapCarParkComponent from '../components/MapComponents/MapCarParkComponent';
import MapPedestrianComponent from '../components/MapComponents/MapPedestrianComponent';

const Wrapper = styled.div`
  position: relative;
  height: calc(100% - 64px); // 100% minus navbar height
  width: 100%;

  .mapboxgl-popup {
    z-index: 1;
    pointer-events: none;
  }
`;

const Sidebar = styled.div`
  position: absolute;
  height: 100%;
  z-index: 1;
  top: 0;
  color: white;
  background-color: rgba(0, 159, 227, 0.8);
  box-shadow: var(--scms-box-shadow);
  padding-top: 1rem;
`;

interface IconLabelProps {
  active?: boolean;
}

const IconLabel = styled.p<IconLabelProps>`
  font-weight: var(--scms-semi-bold);
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 1rem;
  padding-right: 2rem;
  cursor: pointer;
  background-color: ${(props) =>
    props.active ? 'rgba(255, 255, 255, 0.2)' : ''};

  > svg {
    width: 3rem;
  }

  :hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

function Map() {
  const viewport = useSelector((state: RootStateOrAny) => state.map.viewport);
  // const bbox = useSelector((state: RootStateOrAny) => state.map.bbox);
  const dispatch = useDispatch();

  const [featuresVisible, setFeaturesVisible] = useState({
    opensensemap: false,
    aasee: false,
    carPark: false,
    pedestrians: false,
    bicycles: false,
  });

  const rasterStyle = {
    version: 8,
    sources: {
      'raster-tiles': {
        type: 'raster',
        tiles: ['https://geo.stadt-muenster.de/basiskarte/{z}/{x}/{y}.png'],
        tileSize: 256,
      },
    },
    layers: [
      {
        id: 'simple-tiles',
        type: 'raster',
        source: 'raster-tiles',
        minzoom: 0,
        maxzoom: 18,
      },
    ],
  };

  return (
    <Wrapper>
      <ReactMapGL
        {...viewport}
        mapStyle={rasterStyle} // flickering of layers due to raster layer
        width="100%"
        height="100%"
        onViewportChange={(nextViewport: any) => {
          dispatch(updateMapViewport(nextViewport));
        }}
      >
        <MapCarParkComponent
          visible={featuresVisible.carPark}
        ></MapCarParkComponent>
        <MapPedestrianComponent
          visible={featuresVisible.pedestrians}
        ></MapPedestrianComponent>
      </ReactMapGL>
      <Sidebar>
        <IconLabel>
          <Temperature fill="#fff" />
          Temperatur
        </IconLabel>
        <IconLabel>
          <Humidity fill="#fff" />
          rel. Luftfeuchte
        </IconLabel>
        <IconLabel>
          <Pressure fill="#fff" />
          Luftdruck
        </IconLabel>
        <IconLabel>
          <WaterTemperature fill="#fff" />
          Wassertemperatur
        </IconLabel>
        <IconLabel>
          <PH fill="#fff" />
          ph-Wert
        </IconLabel>
        <IconLabel
          active={featuresVisible.carPark}
          onClick={() =>
            setFeaturesVisible({
              ...featuresVisible,
              carPark: !featuresVisible.carPark,
            })
          }
        >
          <CarParking fill="#fff" />
          Parkhäuser
        </IconLabel>
        <IconLabel
          active={featuresVisible.pedestrians}
          onClick={() =>
            setFeaturesVisible({
              ...featuresVisible,
              pedestrians: !featuresVisible.pedestrians,
            })
          }
        >
          <Pedestrian fill="#fff" />
          Passanten
        </IconLabel>
        <IconLabel>
          <Bicycle fill="#fff" />
          Fahrräder
        </IconLabel>
      </Sidebar>
    </Wrapper>
  );
}

export default Map;
