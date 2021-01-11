import ReactMapGL from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { updateFeaturesVisible, updateMapViewport } from '../actions/map';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useMediaQuery } from 'beautiful-react-hooks';

import {
  Humidity,
  Pressure,
  Temperature,
  WaterTemperature,
  PH,
  CarParking,
  Bicycle,
  Pedestrian,
  ChevronLeft,
  ChevronRight,
  Water,
} from '../components/Icons';
import MapCarParkComponent from '../components/MapComponents/MapCarParkComponent';
import MapPedestrianComponent from '../components/MapComponents/MapPedestrianComponent';
import MapAaseeComponent from '../components/MapComponents/MapAaseeComponent';

const Wrapper = styled.div`
  position: relative;
  height: calc(100% - 64px); // 100% minus navbar height
  width: 100%;

  .mapboxgl-popup {
    z-index: 1;
    pointer-events: none;
  }
`;

interface IconLabelProps {
  active?: boolean;
}

const IconLabel = styled.div<IconLabelProps>`
  min-height: 48px;
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

interface ISidebarProps {
  collapsed: boolean;
}

const Sidebar = styled.div<ISidebarProps>`
  position: absolute;
  height: 100%;
  z-index: 1;
  top: 0;
  color: white;
  background-color: rgba(0, 159, 227, 0.8);
  box-shadow: var(--scms-box-shadow);
  padding-top: 1rem;

  > ${IconLabel} {
    padding-right: ${(props) => (props.collapsed ? '1rem' : '2rem')};
  }
`;

function Map() {
  const viewport = useSelector((state: RootStateOrAny) => state.map.viewport);
  const features = useSelector((state: RootStateOrAny) => state.map.features);
  // const bbox = useSelector((state: RootStateOrAny) => state.map.bbox);
  const dispatch = useDispatch();

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const isSmall = useMediaQuery('(max-width: 48rem)');

  useEffect(() => {
    setSidebarCollapsed(isSmall);
  }, [isSmall]);

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
      >
        <MapCarParkComponent visible={features.parking}></MapCarParkComponent>
        <MapPedestrianComponent
          visible={features.pedestrians}
        ></MapPedestrianComponent>
        <MapAaseeComponent visible={features.aasee}></MapAaseeComponent>
      </ReactMapGL>
      <Sidebar collapsed={sidebarCollapsed}>
        <IconLabel
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          style={{
            marginBottom: '1rem',
          }}
        >
          {/* Icons from FeatherIcons */}
          {!sidebarCollapsed ? (
            <>
              <ChevronLeft />
              <p>Minimieren</p>
            </>
          ) : (
            <ChevronRight />
          )}
        </IconLabel>
        <IconLabel>
          <Temperature fill="#fff" />
          {!sidebarCollapsed && <p>Temperatur</p>}
        </IconLabel>
        <IconLabel>
          <Humidity fill="#fff" />
          {!sidebarCollapsed && <p>rel. Luftfeuchte</p>}
        </IconLabel>
        <IconLabel>
          <Pressure fill="#fff" />
          {!sidebarCollapsed && <p>Luftdruck</p>}
        </IconLabel>
        <IconLabel
          active={features.aasee}
          onClick={() =>
            dispatch(
              updateFeaturesVisible({
                ...features,
                aasee: !features.aasee,
              })
            )
          }
        >
          <WaterTemperature fill="#fff" />
          {!sidebarCollapsed && <p>Wassertemperatur</p>}
        </IconLabel>
        <IconLabel
          active={features.aasee}
          onClick={() =>
            dispatch(
              updateFeaturesVisible({
                ...features,
                aasee: !features.aasee,
              })
            )
          }
        >
          <PH fill="#fff" />
          {!sidebarCollapsed && <p>ph-Wert</p>}
        </IconLabel>
        <IconLabel
          active={features.aasee}
          onClick={() =>
            dispatch(
              updateFeaturesVisible({
                ...features,
                aasee: !features.aasee,
              })
            )
          }
        >
          <Water fill="#fff" />
          {!sidebarCollapsed && <p>Sauerstoffgehalt</p>}
        </IconLabel>
        <IconLabel
          active={features.parking}
          onClick={() =>
            dispatch(
              updateFeaturesVisible({
                ...features,
                parking: !features.parking,
              })
            )
          }
        >
          <CarParking fill="#fff" />
          {!sidebarCollapsed && <p>Parkhäuser</p>}
        </IconLabel>
        <IconLabel
          active={features.pedestrians}
          onClick={() =>
            dispatch(
              updateFeaturesVisible({
                ...features,
                pedestrians: !features.pedestrians,
              })
            )
          }
        >
          <Pedestrian fill="#fff" />
          {!sidebarCollapsed && <p>Passanten</p>}
        </IconLabel>
        <IconLabel>
          <Bicycle fill="#fff" />
          {!sidebarCollapsed && <p>Fahrräder</p>}
        </IconLabel>
      </Sidebar>
    </Wrapper>
  );
}

export default Map;
