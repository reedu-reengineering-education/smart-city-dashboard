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

// @ts-nocheck

import React, { useEffect } from 'react';
import { useSelector, RootStateOrAny, useDispatch } from 'react-redux';
import { loadBicycleStationData } from '../../actions/bicycle';
import { Bicycle } from '../Icons';
import TimeSeriesChart from '../TimeSeriesChart';
import { Marker, Popup } from 'react-leaflet';
import { renderToStaticMarkup } from 'react-dom/server';

import MapMarker from './MapMarker';
import { PopupContent } from './styles';

const bicycleStations = [
  100035541, // Neutor
  100034980, // Hammer Str
  100053305, // Kanalpromenade
  100034983, // Warendorfer Str.
  100034982, // Hüfferstr
  100034981, // Weseler Str
  100034978, // Gartenstr
  100031297, // Promenade
  100053305, // Kanalpromenade
  100031300, // Hafenstr.
  100020113, // Wolbecker
];

const BicycleMarker = () => {
  const bicycleData: ServiceState = useSelector(
    (state: RootStateOrAny) => state.bicycle
  );

  const dispatch = useDispatch();

  useEffect(() => {
    bicycleStations.forEach((id: number) => {
      dispatch(loadBicycleStationData(id));
    });
  }, [dispatch]);

  return (
    <>
      {bicycleData.data?.length > 0 &&
        bicycleData?.data
          ?.filter((e: any) => bicycleStations.includes(e.id))
          .map((bicycleStation: any) => (
            <Marker
              key={bicycleStation.id}
              position={[bicycleStation.latitude, bicycleStation.longitude]}
              icon={L.divIcon({
                className: '',
                html: renderToStaticMarkup(
                  <MapMarker
                    color="blue"
                    icon={<Bicycle fill="#fff" />}
                    title={bicycleStation.name}
                    details={`gestern ${
                      bicycleStation.data?.length > 0
                        ? bicycleStation.data[bicycleStation.data.length - 1]
                            .counts
                        : 0
                    } Fahrräder`}
                  ></MapMarker>
                ),
                iconSize: [32, 32],
                iconAnchor: [16, 16],
              })}
            >
              <Popup closeButton={false}>
                <PopupContent>
                  <TimeSeriesChart
                    id="bicycles"
                    width={250}
                    height={200}
                    series={[
                      {
                        name: bicycleStation.name,
                        data: bicycleStation.data?.map((m: any) => ({
                          x: m.date,
                          y: m.counts,
                        })),
                      },
                    ]}
                    title="Fahrräder"
                    type={'line'}
                    chartOptions={{
                      colors: ['#009fe3'],
                      yaxis: {
                        labels: {
                          formatter: (value: number) => {
                            if (!value) return '';
                            return value.toFixed(0);
                          },
                        },
                      },
                      tooltip: {
                        x: {
                          show: false,
                          formatter: (value: number) => {
                            if (!value) return '';

                            const date = new Date(value);

                            return date.toLocaleDateString('de-DE', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            });
                          },
                        },
                        y: {
                          formatter: (value: number) => {
                            if (!value) return '';
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

export default BicycleMarker;
