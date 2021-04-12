import React, { lazy, Suspense, useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  loadPedestrianData,
  loadPedestrianTimeseriesData,
} from '../actions/passanten';
import BaseWidgetComponent from '../components/BaseWidget';
import { TilesWrapper } from '../components/styles';
import Pedestrian from '../resources/animated/Pedestrian';

const MeasurementTile = lazy(() => import('../components/MeasurementTile'));
const TimeSeriesChart = lazy(() => import('../components/TimeSeriesChart'));

const ChartWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const timeRange = (timestamp: string) => {
  const date = new Date(timestamp);

  return `${date.getHours()} - ${date.getHours() + 1} Uhr`;
};

const PassantenComponent = () => {
  const pedestrianData: ServiceState = useSelector(
    (state: RootStateOrAny) => state.passanten
  );

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(false);
  }, [pedestrianData]);

  const dispatch = useDispatch();

  return (
    <BaseWidgetComponent
      title="Passanten"
      icon={Pedestrian}
      loading={loading}
      mapFeatureTag="pedestrians"
      dataSource={`
**Datenquelle**

Die Passantenfrequenzen in Münster stellt Ihnen die Wirtschaftsförderung Münster GmbH in Kooperation mit hystreet.com zur Verfügung.

![WFM](https://www.wfm-muenster.de/wp-content/themes/wfm/images/logo_wfm.svg)
`}
      show24h={() => {
        setLoading(true);
        dispatch(loadPedestrianData());
      }}
      show7d={() => {
        setLoading(true);
        let from = new Date();
        from.setDate(from.getDate() - 7);
        const to = new Date();

        dispatch(loadPedestrianTimeseriesData(from, to));
      }}
      show1m={() => {
        setLoading(true);
        let from = new Date();
        from.setMonth(from.getMonth() - 1);
        const to = new Date();

        dispatch(loadPedestrianTimeseriesData(from, to));
      }}
      detailsDefault={true}
      details={
        <ChartWrapper>
          <Suspense fallback={<Skeleton count={5} />}>
            <TimeSeriesChart
              id="temperature"
              series={
                pedestrianData.data?.length > 0 &&
                pedestrianData.data?.map((sensor: any) => {
                  return {
                    name: sensor.name,
                    data: sensor.measurements.slice(0, -1).map((m: any) => ({
                      x: m.timestamp,
                      y: m.pedestrians_count,
                    })),
                  };
                })
              }
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
                  x: {
                    show: false,
                    formatter: (value: number) => {
                      const date = new Date(value);

                      return `${date.getHours()} - ${date.getHours() + 1} Uhr`;
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
          </Suspense>
        </ChartWrapper>
      }
    >
      <TilesWrapper>
        {pedestrianData.data?.length > 0 &&
          pedestrianData.data?.map((p: any) => (
            <Suspense
              key={p.id}
              fallback={<Skeleton width="100%" height="100%" />}
            >
              <MeasurementTile
                key={p.id}
                footer={timeRange(
                  p.measurements[p.measurements.length - 2].timestamp
                )}
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
