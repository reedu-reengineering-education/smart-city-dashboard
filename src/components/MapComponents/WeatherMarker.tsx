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

import React, { useEffect, useState } from 'react';
import { useSelector, RootStateOrAny } from 'react-redux';
import { Humidity, Pressure, Sun, Temperature, Dust } from '../Icons';
import { Marker, Popup } from 'react-leaflet';

import MapMarker from './MapMarker';
import { renderToStaticMarkup } from 'react-dom/server';
import L from 'leaflet';
import { PopupContent } from './styles';
import TimeSeriesChart from '../TimeSeriesChart';

const WeatherMarker = React.memo(() => {
  const osemData: ServiceState = useSelector(
    (state: RootStateOrAny) => state.opensensemap
  );

  const getTimeSeriesFromOsem = async (boxID: string, sensorID: string) => {
    let from = new Date();
    from.setHours(from.getHours() - 24);
    const request = await fetch(
      `https://api.opensensemap.org/boxes/${boxID}/data/${sensorID}?from-date=${from.toISOString()}`
    );
    const data = await request.json();
    return data;
  };

  const [timeseries, setTimeseries] = useState<any[]>([]);

  useEffect(() => {
    if (timeseries.length >= osemData?.data?.live?.sensors.length) {
      setTimeseries([]);
    }
    osemData?.data?.live?.sensors?.length > 0 &&
      osemData?.data?.live?.sensors.map(async (sensor: any) => {
        const data = await getTimeSeriesFromOsem(
          '5f7ddc9f692773001c7da31c',
          sensor._id
        );
        setTimeseries((old) => [
          ...old,
          {
            sensor,
            data,
          },
        ]);
      });
    // eslint-disable-next-line
  }, [osemData?.data?.live?.sensors]);

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
                      {sensor.title.includes('Beleucht') && (
                        <Sun style={{ padding: '0.2rem' }} />
                      )}
                      {sensor.title.includes('UV-Int') && (
                        <Sun style={{ padding: '0.2rem' }} />
                      )}
                      {sensor.title.includes('PM') && (
                        <Dust style={{ padding: '0.3rem' }} />
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
          >
            {timeseries &&
              timeseries.length > 0 &&
              timeseries.find((e) => e.sensor._id === sensor._id) && (
                <Popup closeButton={false}>
                  <PopupContent>
                    <TimeSeriesChart
                      id="osem"
                      width={250}
                      height={200}
                      series={[
                        {
                          name: timeseries.find(
                            (e) => e.sensor._id === sensor._id
                          ).sensor.title,
                          data: timeseries
                            .find((e) => e.sensor._id === sensor._id)
                            .data.map((measurement: any) => ({
                              x: measurement.createdAt,
                              y: measurement.value,
                            })),
                        },
                      ]}
                      title={`${
                        timeseries.find((e) => e.sensor._id === sensor._id)
                          .sensor.title
                      } in ${
                        timeseries.find((e) => e.sensor._id === sensor._id)
                          .sensor.unit
                      }`}
                      type={'line'}
                      chartOptions={{
                        colors: ['#009fe3'],
                        yaxis: {
                          labels: {
                            formatter: (value: number) => {
                              return `${value.toFixed(2)} ${
                                timeseries.find(
                                  (e) => e.sensor._id === sensor._id
                                ).sensor.unit
                              }`;
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
                              return `${value.toFixed(2)} ${
                                timeseries.find(
                                  (e) => e.sensor._id === sensor._id
                                ).sensor.unit
                              }`;
                            },
                          },
                        },
                      }}
                    ></TimeSeriesChart>
                  </PopupContent>
                </Popup>
              )}
          </Marker>
        ))}
    </>
  );
});

export default WeatherMarker;
