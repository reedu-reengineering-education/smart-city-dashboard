import React, { useEffect, useState, Suspense, lazy } from 'react';
import Skeleton from 'react-loading-skeleton';
import { RootStateOrAny, useSelector } from 'react-redux';
import styled from 'styled-components';
import { MeasurementTile } from './MeasurementTile';
import { ComponentWrapper, HeadingWrapper } from './styles';

const TimeSeriesChart = lazy(() => import('./TimeSeriesChart'));

const TilesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;

  > div[type='area'] {
    width: 100% !important;
  }
`;

const ChartWrapper = styled.div`
  width: 100%;
  height: 9rem;
`;

export const OpenSenseMapComponent = () => {
  const opensensemapData: ServiceState = useSelector(
    (state: RootStateOrAny) => state.opensensemap
  );

  const [temperature, setTemperature] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [pressure, setPressure] = useState(0);

  useEffect(() => {
    if (opensensemapData.data.live.sensors?.length > 0) {
      setTemperature(
        opensensemapData.data.live.sensors[0].lastMeasurement.value
      );
      setHumidity(opensensemapData.data.live.sensors[1].lastMeasurement.value);
      setPressure(opensensemapData.data.live.sensors[2].lastMeasurement.value);
    }
  }, [opensensemapData]);

  return (
    <ComponentWrapper style={{ display: 'flex', flexDirection: 'column' }}>
      <HeadingWrapper>
        <p className="is-size-5">Wetter senseBox</p>
      </HeadingWrapper>
      <TilesWrapper>
        <MeasurementTile
          header="Temperatur"
          value={temperature}
          footer="in °C"
        ></MeasurementTile>
        <MeasurementTile
          header="rel. Luftfeuchte"
          value={humidity}
          footer="in %"
        ></MeasurementTile>
        <MeasurementTile
          header="Luftdruck"
          value={pressure}
          footer="in hPa"
          decimals={0}
        ></MeasurementTile>
      </TilesWrapper>
      <TilesWrapper
        style={{ flexGrow: 1, maxHeight: '20rem', flexDirection: 'column' }}
      >
        {opensensemapData.data.temperature24.length > 0 && (
          <ChartWrapper>
            <Suspense fallback={<Skeleton count={5} />}>
              <TimeSeriesChart
                id="temperature"
                data={opensensemapData.data.temperature24}
                title="Temperatur"
                yAxisTitle="Temperatur in °C"
              ></TimeSeriesChart>
            </Suspense>
          </ChartWrapper>
        )}
        {opensensemapData.data.humidity24.length > 0 && (
          <ChartWrapper>
            <Suspense fallback={<Skeleton count={5} />}>
              <TimeSeriesChart
                id="humidity"
                data={opensensemapData.data.humidity24}
                title="rel. Luftfeuchte"
                yAxisTitle="rel. Luftfeuchte in %"
                chartOptions={{
                  yaxis: {
                    max: 100.001, // adding the .001 still shows the hover dot on the line
                  },
                }}
              ></TimeSeriesChart>
            </Suspense>
          </ChartWrapper>
        )}
      </TilesWrapper>
    </ComponentWrapper>
  );
};
