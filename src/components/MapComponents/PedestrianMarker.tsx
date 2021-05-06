import L from 'leaflet';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { useSelector, RootStateOrAny } from 'react-redux';
import { Marker, Popup } from 'react-leaflet';
import { Pedestrian } from '../Icons';

import MapMarker from './MapMarker';
import TimeSeriesChart from '../TimeSeriesChart';
import { PopupContent } from './styles';

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
          >
            <Popup closeButton={false}>
              <PopupContent>
                <TimeSeriesChart
                  id="pedestrian"
                  width={250}
                  height={200}
                  series={[
                    {
                      name: pedestrianSensor.name,
                      data: pedestrianSensor.measurements.map(
                        (measurement: any) => ({
                          x: measurement.timestamp,
                          y: measurement.pedestrians_count,
                        })
                      ),
                    },
                  ]}
                  title="Passant:innen"
                  type={'line'}
                  chartOptions={{
                    colors: ['#009fe3'],
                    yaxis: {
                      labels: {
                        formatter: (value: number) => {
                          return value.toFixed(0);
                        },
                      },
                    },
                    tooltip: {
                      x: {
                        show: false,
                        formatter: (value: number) => {
                          const date = new Date(value);

                          return `${date.toLocaleString()} Uhr`;
                        },
                      },
                      y: {
                        formatter: (value: number) => {
                          return `${value.toFixed(0)}`;
                        },
                      },
                    },
                  }}
                ></TimeSeriesChart>
              </PopupContent>
            </Popup>
          </Marker>
        ))}
    </>
  );
};

export default PedestrianMarker;
