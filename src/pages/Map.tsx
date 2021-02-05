import React from 'react';
// import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { setActivePopup, updateMapViewport } from '../actions/map';

// import MapCarParkComponent from '../components/MapComponents/MapCarParkComponent';
// import MapPedestrianComponent from '../components/MapComponents/MapPedestrianComponent';
// import MapAaseeComponent from '../components/MapComponents/MapAaseeComponent';
import SidebarComponent from '../components/MapComponents/SidebarComponent';
// import MapOsemComponent from '../components/MapComponents/MapOsemComponent';
// import MapBicycleComponent from '../components/MapComponents/MapBicycleComponent';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import MarkerCluster from '../components/MapComponents/MarkerCluster';
import { CarParking } from '../components/Icons';
import MapMarker from '../components/MapComponents/MapMarker';
import AaseeMarker from '../components/MapComponents/AaseeMarker';

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
  const features = useSelector((state: RootStateOrAny) => state.map.features);
  const popup: JSX.Element | undefined = useSelector(
    (state: RootStateOrAny) => state.map.popup
  );
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

  const parkhausData: ServiceState = useSelector(
    (state: RootStateOrAny) => state.parkhaus
  );

  return (
    <Wrapper>
      {/* <ReactMapGL
        {...viewport}
        mapStyle={rasterStyle}
        width="100%"
        height="100%"
        onViewportChange={(nextViewport: any) => {
          dispatch(updateMapViewport(nextViewport));
        }}
        onClick={() => dispatch(setActivePopup(undefined))}
      >
        <MapCarParkComponent visible={features.parking}></MapCarParkComponent>
        <MapPedestrianComponent
          visible={features.pedestrians}
        ></MapPedestrianComponent>
        <MapAaseeComponent visible={features.aasee}></MapAaseeComponent>
        <MapOsemComponent visible={features.opensensemap}></MapOsemComponent>
        <MapBicycleComponent visible={features.bicycle}></MapBicycleComponent>
        {popup}
      </ReactMapGL> */}
      <MapContainer
        center={[viewport.latitude, viewport.longitude]}
        zoom={viewport.zoom}
        scrollWheelZoom={true}
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          url="https://geo.stadt-muenster.de/basiskarte/{z}/{x}/{y}.png"
        />

        <MarkerCluster
          markers={
            AaseeMarker()
            // parkhausData?.data?.features?.length > 0 &&
            // parkhausData.data.features.map((carPark: any) => {
            //   return {
            //     position: carPark.geometry.coordinates,
            //     text: carPark.properties.NAME,
            //     html: (
            //       <MapMarker
            //         color="blue"
            //         icon={<CarParking fill="#fff" />}
            //         latitude={carPark.geometry.coordinates[1]}
            //         longitude={carPark.geometry.coordinates[0]}
            //         title={carPark.properties.NAME}
            //         details={`${carPark.properties.parkingFree} frei`}
            //       ></MapMarker>
            //     ),
            //   };
            // })
          }
        />
      </MapContainer>
      <SidebarComponent></SidebarComponent>
    </Wrapper>
  );
}

export default Map;
