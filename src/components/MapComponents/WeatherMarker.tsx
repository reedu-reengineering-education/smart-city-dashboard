import React from 'react';
import { useSelector, RootStateOrAny } from 'react-redux';
import { Humidity, Pressure, Temperature } from '../Icons';
import { Marker } from 'react-leaflet';

import MapMarker from './MapMarker';
import { renderToStaticMarkup } from 'react-dom/server';
import L from 'leaflet';

const WeatherMarker = React.memo(() => {
  const osemData: ServiceState = useSelector(
    (state: RootStateOrAny) => state.opensensemap
  );

  return (
    <>
      {osemData?.data?.live?.sensors?.length > 0 &&
        osemData?.data?.live?.sensors.map((sensor: any, index: number) => (
          <Marker
            key={index}
            position={osemData.data.live.currentLocation.coordinates.reverse()}
            icon={L.divIcon({
              className: '',
              html: renderToStaticMarkup(
                <MapMarker
                  color="blue"
                  icon={
                    <>
                      {sensor.title.includes('Temp') && (
                        <Temperature fill="#fff" />
                      )}
                      {sensor.title.includes('Luftf') && (
                        <Humidity fill="#fff" />
                      )}
                      {sensor.title.includes('Luftd') && (
                        <Pressure fill="#fff" />
                      )}
                    </>
                  }
                  title={sensor.title}
                  details={`${Number(sensor.lastMeasurement?.value).toFixed(
                    2
                  )} ${sensor.unit}`}
                ></MapMarker>
              ),
              iconSize: [32, 32],
              iconAnchor: [16, 16],
            })}
          ></Marker>
        ))}
    </>
  );
});

export default WeatherMarker;
