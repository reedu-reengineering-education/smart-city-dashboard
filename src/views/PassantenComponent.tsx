import React, { lazy, Suspense } from 'react';
import Skeleton from 'react-loading-skeleton';
import { RootStateOrAny, useSelector } from 'react-redux';
import styled from 'styled-components';
import BaseWidgetComponent from '../components/BaseWidget';
import { Pedestrian } from '../components/Icons';

const MeasurementTile = lazy(() => import('../components/MeasurementTile'));
const TimeSeriesChart = lazy(() => import('../components/TimeSeriesChart'));

const TilesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const ChartWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const PassantenComponent = () => {
  const pedestrianData: ServiceState = useSelector(
    (state: RootStateOrAny) => state.passanten
  );

  return (
    <BaseWidgetComponent
      title="Passanten"
      icon={<Pedestrian />}
      mapFeatureTag="pedestrians"
      dataSource={`
**Beschreibung**

Lorem ipsum dolor sit amet, consetetur sadipscing elitr, 
sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, 
sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. 
Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. 
Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod 
tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.

**Datenquelle**

Die Passantenfrequenzen in Münster stellt Ihnen hystreet.com in Kooperation mit der Wirtschaftsförderung Münster GmbH zur Verfügung.
`}
      details={
        <ChartWrapper>
          <Suspense fallback={<Skeleton count={5} />}>
            <TimeSeriesChart
              id="temperature"
              series={pedestrianData.data.map((sensor: any) => {
                return {
                  name: sensor.name,
                  data: sensor.measurements.map((m: any) => ({
                    x: m.timestamp,
                    y: m.pedestrians_count,
                  })),
                };
              })}
              title="Passanten"
              type={'line'}
              chartOptions={{
                colors: ['#009fe3', '#86bc25', '#fdc300'],
                yaxis: {
                  labels: {
                    formatter: (value: number) => {
                      return value.toFixed(0);
                    },
                  },
                },
                tooltip: {
                  y: {
                    formatter: (value: number) => {
                      return `${value.toFixed(0)}`;
                    },
                  },
                },
              }}
            ></TimeSeriesChart>
          </Suspense>
        </ChartWrapper>
      }
    >
      <TilesWrapper>
        {pedestrianData?.data.length > 0 &&
          pedestrianData.data.map((p: any) => (
            <Suspense
              key={p.id}
              fallback={<Skeleton width="100%" height="100%" />}
            >
              <MeasurementTile
                key={p.id}
                footer={'letzte Stunde'}
                header={p.name}
                value={
                  p.measurements[p.measurements.length - 2].pedestrians_count
                }
                decimals={0}
              ></MeasurementTile>
            </Suspense>
          ))}
      </TilesWrapper>
    </BaseWidgetComponent>
  );
};

export default PassantenComponent;
