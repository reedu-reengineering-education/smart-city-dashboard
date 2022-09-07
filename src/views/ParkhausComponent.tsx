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

import React, { Suspense, useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { loadParkhausTimeseriesData } from '../actions/parkhaus';
import BaseWidgetComponent from '../components/BaseWidget';
import { Progress } from '../components/Progress';
import { ChartWrapper, HeadingWrapper } from '../components/styles';
import TimeSeriesChart from '../components/TimeSeriesChart';
import { IParkingState } from '../reducers/parkhaus';
import Parking from '../resources/animated/Parking';

const ParkhausProgressWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-height: 25rem;
  @media screen and (min-width: 788px) and (max-width: 1290px) {
    max-height: 42rem;
  }
  overflow-y: scroll;
  padding: 0.5rem;
`;

const ParkhausHeadingWrapper = styled(HeadingWrapper)`
  justify-content: space-between;
`;

const ProgressLegend = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0.5rem;

  > * {
    font-weight: bold;
    font-size: smaller;
  }

  > .blue {
    color: var(--scms-primary-blue);
  }

  > .red {
    color: var(--scms-red);
  }

  > .green {
    color: var(--scms-green);
  }
`;

const StatsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1rem;
`;

const StatusGreen = styled.span`
  color: var(--scms-green);
  font-weight: bold;
`;

const StatusRed = styled.span`
  color: var(--scms-red);
  font-weight: bold;
`;

/**
 *
 * @returns The main view for parking data. Renders custom porgress component for current data and timeline for timeseries data
 */
const ParkhausComponent = () => {
  // get data from redux store
  const parkhausData: IParkingState = useSelector(
    (state: RootStateOrAny) => state.parkhaus
  );

  const parkhausTimeline: {
    data: any[];
    metadata: any;
  } = useSelector((state: RootStateOrAny) => state.parkhaus.dataTimeline);

  const [chartData, setChartData] = useState<
    { name: any; data: { x: Date; y: any }[] }[]
  >();

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (parkhausTimeline?.data?.length > 0) {
      const filtered = parkhausTimeline?.data?.filter((pht) => pht != null);

      // eslint-disable-next-line
      const times = filtered.map((ph) => {
        if (ph?.timestamp) return ph.timestamp;
      });

      if (filtered.length === 0) {
        return;
      }

      const parkingSpots = Object.keys(filtered[0]).filter(
        (p) => p !== 'timestamp' && p !== 'Datum und Uhrzeit'
      );

      const myChartData = parkingSpots.map((p: any) => {
        const data = times.map((t) => ({
          x: new Date(t),
          y: filtered.find((pht) => pht.timestamp === t)[p],
        }));

        return {
          name: p,
          data,
        };
      });

      setChartData(myChartData);
    }
    setLoading(false);
  }, [parkhausTimeline]);

  const [parkingTotal, setParkingTotal] = useState(0);
  const [carParkTotal, setCarParkTotal] = useState(0);
  const [freeTotal, setFreeTotal] = useState(0);

  useEffect(() => {
    if (parkhausData?.data?.features?.length > 0) {
      // calculate total parking lots
      const parkingTotalReducer = (acc: any, curr: any) =>
        acc + Number(curr.properties?.parkingTotal);

      setParkingTotal(
        parkhausData?.data?.features?.reduce(parkingTotalReducer, 0)
      );

      setCarParkTotal(parkhausData?.data?.features?.length);

      const freeTotalReducer = (acc: any, curr: any) =>
        acc + Number(curr.properties?.parkingFree);

      setFreeTotal(parkhausData?.data?.features?.reduce(freeTotalReducer, 0));
    }
  }, [parkhausData]);

  return (
    <BaseWidgetComponent
      mapFeatureTag="parking"
      icon={Parking}
      title="Parkhäuser"
      loading={loading}
      show24h={() => {
        setLoading(true);
        let from = new Date();
        from.setDate(from.getDate() - 1);

        dispatch(loadParkhausTimeseriesData(from, new Date()));
      }}
      show7d={() => {
        setLoading(true);
        let from = new Date();
        from.setDate(from.getDate() - 7);

        dispatch(loadParkhausTimeseriesData(from, new Date()));
      }}
      show1m={() => {
        setLoading(true);
        let from = new Date();
        from.setDate(from.getMonth() - 1);

        dispatch(loadParkhausTimeseriesData(from, new Date()));
      }}
      details={
        <ChartWrapper>
          <Suspense fallback={<Skeleton count={5} />}>
            <TimeSeriesChart
              id="parking"
              series={chartData || []}
              type={'line'}
              chartOptions={{
                colors: [
                  '#009fe3',
                  '#86bc25',
                  '#fdc300',
                  '#f28c00',
                  '#ea4f3d',
                  '#323232',
                  '#FFC4EB',
                  '#ABC798',
                  '#75485E',
                  '#DFCC74',
                  '#CB904D',
                  '#253C78',
                  '#D36582',
                  '#2B59C3',
                  '#002A22',
                  '#B33C86',
                ],
                yaxis: {
                  title: {
                    text: 'Belegte Parkplätze',
                  },
                  labels: {
                    formatter: (value: number) => {
                      if (!value) return '';
                      return value.toFixed(0);
                    },
                  },
                },
                tooltip: {
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
      dataSource={`
Die Stadt Münster verfügt über ca. 6.100 Stellplätze für Autos in der Altstadt und dem Bahnhofsbereich. Zur besseren Orientierung und zur Vermeidung von Parksuchverkehren verfügt die Stadt Münster über ein modernes, dynamisches Parkleitsystem. Dort finden Sie Auskünfte über die genaue Lage der größeren öffentlich zugänglichen Parkplätze und Parkhäuser, die Ausstattung und die aktuelle Stellplatzkapazität: [http://www.stadt-muenster.de/tiefbauamt/parkleitsystem](http://www.stadt-muenster.de/tiefbauamt/parkleitsystem)

Weitere Informationen zu den Parkhäusern und Parkplätzen in Münster finden Sie auf [den Seiten des Amtes für Mobilität und Tiefbau der Stadt Münster](https://www.stadt-muenster.de/tiefbauamt/strassen/parken-in-muenster.html), sowie [auf der Homepage der Westfälische Bauindustrie GmbH (WBI)](https://www.wbi-muenster.de/parken-in-muenster/uebersicht.php)

Datenquelle: Amt für Mobilität und Tiefbau, Stadt Münster

Kontakt für inhaltliche Fragen: Andreas Pott, [pott@stadt-muenster.de](mailto:pott@stadt-muenster.de)

**Daten im Open-Data-Portal:**
- [Aktuelle Parkhausbelegung](https://opendata.stadt-muenster.de/dataset/parkleitsystem-parkhausbelegung-aktuell)
`}
      headerOverride={
        <ParkhausHeadingWrapper>
          <StatsWrapper>
            <p className="is-size-7">Parkplätze gesamt: {parkingTotal}</p>
            <p className="is-size-7">Parkhäuser gesamt: {carParkTotal}</p>
          </StatsWrapper>
          <StatsWrapper>
            <p className="is-size-7">
              Frei gesamt: <StatusGreen>{freeTotal}</StatusGreen>
            </p>
            <p className="is-size-7">
              Belegt gesamt: <StatusRed>{parkingTotal - freeTotal}</StatusRed>
            </p>
          </StatsWrapper>
        </ParkhausHeadingWrapper>
      }
    >
      <>
        <ProgressLegend>
          <p className="blue">Parkhaus</p>
          <p className="red">Belegte Plätze</p>
          <p className="green">Freie Plätze</p>
        </ProgressLegend>
        <ParkhausProgressWrapper>
          {parkhausData?.data?.features?.length > 0 &&
            parkhausData?.data?.features?.map((p: any) => (
              <Progress
                key={p.properties.LFDNR}
                id={p.properties.LFDNR}
                title={p.properties.NAME.replace('Parkhaus ', '')
                  .replace('Parkplatz ', '')
                  .replace('PH ', '')} // replace text we don't really need
                value={p.properties.parkingFree}
                max={p.properties.parkingTotal}
              ></Progress>
            ))}
        </ParkhausProgressWrapper>
      </>
    </BaseWidgetComponent>
  );
};

export default ParkhausComponent;
