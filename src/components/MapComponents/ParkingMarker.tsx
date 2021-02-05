import L from 'leaflet';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { useSelector, RootStateOrAny } from 'react-redux';
import { Marker } from 'react-leaflet';
import { CarParking } from '../Icons';

import MapMarker from './MapMarker';

const MapCarParkComponent = () => {
  const parkhausData: ServiceState = useSelector(
    (state: RootStateOrAny) => state.parkhaus
  );

  return (
    <>
      {parkhausData?.data?.features?.length > 0 &&
        parkhausData.data.features.map((carPark: any) => (
          <Marker
            key={carPark.properties.LFDNR}
            position={carPark.geometry.coordinates.reverse()}
            icon={L.divIcon({
              className: '',
              html: renderToStaticMarkup(
                <MapMarker
                  color="blue"
                  icon={<CarParking fill="#fff" />}
                  title={carPark.properties.NAME}
                  details={`${carPark.properties.parkingFree} frei`}
                ></MapMarker>
              ),
              iconSize: [32, 32],
              iconAnchor: [16, 16],
            })}
          ></Marker>
        ))}
    </>
  );
};

export default MapCarParkComponent;
