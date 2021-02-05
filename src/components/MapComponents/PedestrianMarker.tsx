import L from 'leaflet';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { useSelector, RootStateOrAny } from 'react-redux';
import { Marker } from 'react-leaflet';
import { Pedestrian } from '../Icons';

import MapMarker from './MapMarker';

const PedestrianMarker = () => {
  const pedestrianData: ServiceState = useSelector(
    (state: RootStateOrAny) => state.passanten
  );

  return (
    <>
      {pedestrianData?.data?.length > 0 &&
        pedestrianData.data.map((pedestrianSensor: any) => (
          <Marker
            key={pedestrianSensor.id}
            position={[
              pedestrianSensor.metadata.location.latitude,
              pedestrianSensor.metadata.location.longitude,
            ]}
            icon={L.divIcon({
              className: '',
              html: renderToStaticMarkup(
                <MapMarker
                  color="blue"
                  icon={<Pedestrian fill="#fff" />}
                  title={pedestrianSensor.name}
                  details={`${
                    pedestrianSensor.measurements[
                      pedestrianSensor.measurements.length - 2
                    ].pedestrians_count
                  } letzte Stunde`}
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

export default PedestrianMarker;
