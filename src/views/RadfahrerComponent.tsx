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

import React, { lazy, Suspense, useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import BaseWidgetComponent from '../components/BaseWidget';
import Bicycle from '../resources/animated/Bicycle';
import { TilesWrapper, ChartWrapper } from '../components/styles';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import {
  loadBicycleData,
  loadBicycleStationData,
  loadBicycleTimeseriesData,
} from '../actions/bicycle';
import styled from 'styled-components';
import TimeSeriesChart from '../components/TimeSeriesChart';

const MeasurementTile = lazy(() => import('../components/MeasurementTile'));

const BicycleTilesWrapper = styled(TilesWrapper)`
  > div {
    @media screen and (min-width: 1539px) {
      /* add margin so that chart has has more space */
      margin-top: 2rem;
      margin-bottom: 2rem;
    }
    display: flex;
    justify-content: center;
  }
`;

// which stations should be displayed in tiles
const bicycleStations = [
  100031297, // Promenade
  100020113, // Wolbecker
  100034980, // Hammer Str
  100034983, // Warendorfer
  100035541, // Neutor
  100034978, // Gartenstr
];

/**
 *
 * @returns The main view for bicycle data. Renders tiles for current data and timeline for timeseries data
 */
const RadfahrerComponent = () => {
  // get data from redux store
  const bicycleData: ServiceState = useSelector(
    (state: RootStateOrAny) => state.bicycle
  );
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(false);
  }, [bicycleData]);

  // this is just a trigger for the useEffect hook to load latest bicycle station data
  const [loadDefaultData, setLoadDefaultData] = useState<Date>(new Date());
  useEffect(() => {
    bicycleStations.forEach((id: number) => {
      dispatch(loadBicycleStationData(id));
    });
  }, [dispatch, loadDefaultData]);

  return (
    <BaseWidgetComponent
      title="Fahrräder"
      icon={Bicycle}
      mapFeatureTag="bicycle"
      loading={loading}
      show7d={() => {
        setLoading(true);
        setLoadDefaultData(new Date());
        dispatch(loadBicycleData());
      }}
      show1m={() => {
        setLoading(true);
        let from = new Date();
        from.setMonth(from.getMonth() - 1);
        const to = new Date();

        dispatch(loadBicycleTimeseriesData(from, to));
      }}
      dataSource={`
Anlässlich des nationalen Radverkehrskongresses im Jahr 2013 in Münster wurde erstmals eine Pilotzählstelle am Neutor mit automatischen Zählgeräten eingerichtet. Die Zählergebnisse der Pilotzählstelle sind überraschend und beeindruckend zugleich: An einigen Juni-/Julitagen wurden Spitzenwerte von 23.000 Radfahrten binnen 24 Stunden registriert. Insgesamt passierten seit 2014 jährlich jeweils über 4 Millionen Radfahrerinnen und Radfahrer die Zählstelle am Neutor.

Die Daten dienen nicht nur dazu, infrastrukturelle Investitionen zu begründen und Prioritäten für Maßnahmen zu benennen, sondern unter anderem auch dazu, um ein genaueres Abbild des täglichen Radverkehrsgeschehens zu erhalten, saisonale Schwankungen zu erfassen und Trends zu erkennen.

Weitere neun Dauerzählstellen (jeweils in Richtung und Gegenrichtung) wurden seit 2015 im Stadtgebiet installiert.

Weitere Informationen zu den Radverkehrszählstellen in Münster finden Sie auf [den Seiten des Amtes für Mobilität und Tiefbau der Stadt Münster](https://www.stadt-muenster.de/verkehrsplanung/verkehr-in-zahlen/radverkehrszaehlungen).

Datenquelle: Fahrradbüro, Amt für Mobilität und Tiefbau, Stadt Münster

Kontakt für inhaltliche Fragen: [fahrradbuero@stadt-muenster.de](mailto:fahrradbuero@stadt-muenster.de)

**Daten im Open-Data-Portal:**
- [Tagesaktuelle Daten](https://opendata.stadt-muenster.de/dataset/verkehrsz%C3%A4hlung-fahrradverkehr-tagesaktuelle-daten)
- [Kanalpromenade](https://opendata.stadt-muenster.de/dataset/verkehrsz%C3%A4hlung-fahrradverkehr-daten-der-z%C3%A4hlstellen-m%C3%BCnster-kanalpromenade)
- [Schlossbezirk](https://opendata.stadt-muenster.de/dataset/verkehrsz%C3%A4hlung-fahrradverkehr-daten-der-z%C3%A4hlstellen-m%C3%BCnster-schlo%C3%9Fbezirk)
- [Josefsviertel](https://opendata.stadt-muenster.de/dataset/verkehrsz%C3%A4hlung-fahrradverkehr-daten-der-z%C3%A4hlstellen-m%C3%BCnster-josefsviertel)
- [Bahnhofsviertel](https://opendata.stadt-muenster.de/dataset/verkehrsz%C3%A4hlung-fahrradverkehr-daten-der-z%C3%A4hlstellen-m%C3%BCnster-bahnhofsviertel)
- [Schlachthofviertel](https://opendata.stadt-muenster.de/dataset/verkehrsz%C3%A4hlung-fahrradverkehr-daten-der-z%C3%A4hlstellen-m%C3%BCnster-schlachthofviertel)
`}
      details={
        <ChartWrapper>
          <Suspense fallback={<Skeleton count={5} />}>
            <TimeSeriesChart
              id="bicycles"
              series={
                bicycleData.data?.length > 0
                  ? bicycleData.data
                      .filter((e: any) => bicycleStations.includes(e.id))
                      .map((bicycleStation: any) => {
                        return {
                          name: bicycleStation.name,
                          data: bicycleStation.data?.map((m: any) => ({
                            x: m.date,
                            y: m.counts,
                          })),
                        };
                      })
                  : []
              }
              type={'line'}
              chartOptions={{
                colors: [
                  '#009fe3',
                  '#86bc25',
                  '#fdc300',
                  '#323232',
                  '#f28c00',
                  '#ea4f3d',
                ],
                yaxis: {
                  title: {
                    text: 'Fahrräder pro Tag',
                  },
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
          </Suspense>
        </ChartWrapper>
      }
    >
      <BicycleTilesWrapper>
        {bicycleData?.data?.length > 0 &&
          bicycleData.data
            .filter((e: any) => bicycleStations.includes(e.id))
            .map((bicycleStation: any) => (
              <Suspense
                key={bicycleStation.id}
                fallback={<Skeleton width="100%" height="100%" />}
              >
                <div>
                  <MeasurementTile
                    header={bicycleStation.name.replace('Straße', 'Str')}
                    value={
                      bicycleStation.data?.length > 0 &&
                      bicycleStation.data[bicycleStation.data.length - 1].counts
                    }
                    decimals={0}
                    footer="Gestern gesamt"
                  ></MeasurementTile>
                </div>
              </Suspense>
            ))}
      </BicycleTilesWrapper>
    </BaseWidgetComponent>
  );
};

export default RadfahrerComponent;
