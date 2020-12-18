import ReactMapGL from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { updateMapViewport } from '../actions/map';
import React from 'react';
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

const Wrapper = styled.div`
  position: relative;
  height: calc(100% - 64px); // 100% minus navbar height
  width: 100%;
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

const IconLabel = styled.p`
  font-weight: var(--scms-semi-bold);
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 1rem;
  padding-right: 2rem;
  cursor: pointer;

  > svg {
    width: 3rem;
  }

  :hover {
    background-color: rgba(255, 255, 255, 0.2);
    background-blend-mode: lighten;
  }
`;

function Map() {
  const viewport = useSelector((state: RootStateOrAny) => state.map.viewport);
  // const bbox = useSelector((state: RootStateOrAny) => state.map.bbox);
  const dispatch = useDispatch();

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
        mapStyle={rasterStyle}
        width="100%"
        height="100%"
        onViewportChange={(nextViewport: any) => {
          dispatch(updateMapViewport(nextViewport));
        }}
      />
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
        <IconLabel>
          <CarParking fill="#fff" />
          Parkhäuser
        </IconLabel>
        <IconLabel>
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
