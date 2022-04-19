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
import React, { useEffect, useState } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Marker, Popup } from 'react-leaflet';
import { useSelector, RootStateOrAny } from 'react-redux';

import { PH, Water, WaterTemperature } from '../Icons';
import TimeSeriesChart from '../TimeSeriesChart';
import MapMarker from './MapMarker';
import { PopupContent } from './styles';

const AaseeMarker = () => {
  const aaseeData: ServiceState = useSelector(
    (state: RootStateOrAny) => state.aasee
  );

  const [temperature, setTemperature] = useState(0);
  const [ph, setPh] = useState(0);
  const [oxygen, setOxygen] = useState(0);

  useEffect(() => {
    if (aaseeData.data.data) {
      setTemperature(aaseeData.data?.data?.water_temperature[0]?.value);
      setPh(aaseeData.data?.data?.pH[0]?.value);
      setOxygen(aaseeData.data?.data?.dissolved_oxygen[0]?.value);
    }
  }, [aaseeData]);

  return (
    <>
      {aaseeData?.data?.metadata && temperature && (
        <Marker
          position={[
            aaseeData?.data?.metadata?.location?.latitude,
            aaseeData?.data?.metadata?.location?.longitude,
          ]}
          icon={L.divIcon({
            className: '',
            html: renderToStaticMarkup(
              <MapMarker
                color="blue"
                icon={<WaterTemperature fill="#fff" />}
                title={'Wassertemperatur'}
                details={`${temperature.toFixed(2)} °C`}
              ></MapMarker>
            ),
            iconSize: [32, 32],
            iconAnchor: [16, 16],
          })}
        >
          <Popup closeButton={false}>
            <PopupContent>
              <TimeSeriesChart
                id="aasee"
                title="Wassertemperatur"
                width={250}
                height={200}
                series={[
                  {
                    name: 'Wassertemperatur',
                    data: aaseeData?.data?.data?.water_temperature.map(
                      (measurement: any) => {
                        return {
                          x: measurement.time,
                          y: measurement.value,
                        };
                      }
                    ),
                  },
                ]}
                type={'line'}
                chartOptions={{
                  colors: ['#f28c00'],
                  yaxis: {
                    labels: {
                      formatter: (value: number) => {
                        if (!value) return '';
                        return value.toFixed(1);
                      },
                    },
                  },
                  tooltip: {
                    x: {
                      show: false,
                      formatter: (value: number) => {
                        if (!value) return '';

                        const date = new Date(value);

                        return `${date.toLocaleString()} Uhr`;
                      },
                    },
                    y: {
                      formatter: (value: number) => {
                        if (!value) return '';
                        return `${value.toFixed(1)} '°C'`;
                      },
                    },
                  },
                  chart: {
                    animations: {
                      animateGradually: {
                        enabled: false,
                      },
                      speed: 100,
                    },
                  },
                }}
              ></TimeSeriesChart>
            </PopupContent>
          </Popup>
        </Marker>
      )}
      {aaseeData?.data?.metadata && ph && (
        <Marker
          position={[
            aaseeData?.data?.metadata?.location?.latitude,
            aaseeData?.data?.metadata?.location?.longitude,
          ]}
          icon={L.divIcon({
            className: '',
            html: renderToStaticMarkup(
              <MapMarker
                color="blue"
                icon={<PH fill="#fff" />}
                title={'PH Wert'}
                details={`${ph.toFixed(2)}`}
              ></MapMarker>
            ),
            iconSize: [32, 32],
            iconAnchor: [16, 16],
          })}
        >
          <Popup closeButton={false}>
            <PopupContent>
              <TimeSeriesChart
                id="aasee"
                title="pH-Wert"
                width={250}
                height={200}
                series={[
                  {
                    name: 'pH-Wert',
                    data: aaseeData?.data?.data?.pH.map((measurement: any) => {
                      return {
                        x: measurement.time,
                        y: measurement.value,
                      };
                    }),
                  },
                ]}
                type={'line'}
                chartOptions={{
                  colors: ['#86bc25'],
                  yaxis: {
                    labels: {
                      formatter: (value: number) => {
                        if (!value) return '';
                        return value.toFixed(1);
                      },
                    },
                  },
                  tooltip: {
                    x: {
                      show: false,
                      formatter: (value: number) => {
                        if (!value) return '';

                        const date = new Date(value);

                        return `${date.toLocaleString()} Uhr`;
                      },
                    },
                    y: {
                      formatter: (value: number) => {
                        if (!value) return '';
                        return `${value.toFixed(1)}`;
                      },
                    },
                  },
                  chart: {
                    animations: {
                      animateGradually: {
                        enabled: false,
                      },
                      speed: 100,
                    },
                  },
                }}
              ></TimeSeriesChart>
            </PopupContent>
          </Popup>
        </Marker>
      )}
      {aaseeData?.data?.metadata && oxygen && (
        <Marker
          position={[
            aaseeData?.data?.metadata?.location?.latitude,
            aaseeData?.data?.metadata?.location?.longitude,
          ]}
          icon={L.divIcon({
            className: '',
            html: renderToStaticMarkup(
              <MapMarker
                color="blue"
                icon={<Water fill="#fff" />}
                title={'Sauerstoffgehalt'}
                details={`${oxygen.toFixed(2)} mg/L`}
              ></MapMarker>
            ),
            iconSize: [32, 32],
            iconAnchor: [16, 16],
          })}
        >
          <Popup closeButton={false}>
            <PopupContent>
              <TimeSeriesChart
                id="aasee"
                title="Sauerstoffgehalt"
                width={250}
                height={200}
                series={[
                  {
                    name: 'Sauerstoff',
                    data: aaseeData?.data?.data?.dissolved_oxygen.map(
                      (measurement: any) => {
                        return {
                          x: measurement.time,
                          y: measurement.value,
                        };
                      }
                    ),
                  },
                ]}
                type={'line'}
                chartOptions={{
                  colors: ['#009fe3'],
                  yaxis: {
                    labels: {
                      formatter: (value: number) => {
                        if (!value) return '';
                        return value.toFixed(1);
                      },
                    },
                  },
                  tooltip: {
                    x: {
                      show: false,
                      formatter: (value: number) => {
                        if (!value) return '';

                        const date = new Date(value);

                        return `${date.toLocaleString()} Uhr`;
                      },
                    },
                    y: {
                      formatter: (value: number) => {
                        if (!value) return '';
                        return `${value.toFixed(1)} mg/L`;
                      },
                    },
                  },
                  chart: {
                    animations: {
                      animateGradually: {
                        enabled: false,
                      },
                      speed: 100,
                    },
                  },
                }}
              ></TimeSeriesChart>
            </PopupContent>
          </Popup>
        </Marker>
      )}
    </>
  );
};

export default AaseeMarker;
