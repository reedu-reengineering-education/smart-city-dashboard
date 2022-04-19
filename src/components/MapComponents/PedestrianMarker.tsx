/**
 * Smart City Münster Dashboard
 * Copyright (C) 2022 Reedu GmbH & Co. KG
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

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
                      data: pedestrianSensor.measurements
                        ?.slice(0, -1)
                        .map((measurement: any) => ({
                          x: measurement.timestamp,
                          y: measurement.pedestrians_count,
                        })),
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
