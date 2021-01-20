import React, { useEffect, useState, Suspense, lazy } from 'react';
import Skeleton from 'react-loading-skeleton';
import { RootStateOrAny, useSelector } from 'react-redux';
import styled from 'styled-components';
import BaseWidgetComponent from './BaseWidget';
import { Pressure } from './Icons';

const MeasurementTile = lazy(() => import('../components/MeasurementTile'));
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

const OpenSenseMapComponent = () => {
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
    <BaseWidgetComponent
      title="Wetter senseBox"
      icon={<Pressure />}
      mapFeatureTag="opensensemap"
      dataSource={`
**Beschreibung**

Lorem ipsum dolor sit amet, consetetur sadipscing elitr, 
sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, 
sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. 
Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. 
Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod 
tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.

**Datenquelle**

![Smart City Münster Logo](https://smartcity.ms/wp-content/uploads/2020/12/Smart-City-Mu%CC%88nster_Logo_20201210_RGB_240x62.png)

Stadt Münster - Smart City
`}
    >
      <>
        <TilesWrapper>
          <Suspense fallback={<Skeleton width="100%" height="100%" />}>
            <MeasurementTile
              header="Temperatur"
              value={temperature}
              footer="in °C"
            ></MeasurementTile>
          </Suspense>
          <Suspense fallback={<Skeleton width="100%" height="100%" />}>
            <MeasurementTile
              header="rel. Luftfeuchte"
              value={humidity}
              footer="in %"
            ></MeasurementTile>
          </Suspense>
          <Suspense fallback={<Skeleton width="100%" height="100%" />}>
            <MeasurementTile
              header="Luftdruck"
              value={pressure}
              footer="in hPa"
              decimals={0}
            ></MeasurementTile>
          </Suspense>
        </TilesWrapper>
        <TilesWrapper
          style={{
            flexGrow: 1,
            maxHeight: '20rem',
            flexDirection: 'column',
          }}
        >
          {opensensemapData.data.temperature24.length > 0 && (
            <ChartWrapper>
              <Suspense fallback={<Skeleton count={5} />}>
                <TimeSeriesChart
                  id="temperature"
                  series={[
                    {
                      name: 'Temperatur',
                      data: opensensemapData.data.temperature24,
                    },
                  ]}
                  title="Temperatur"
                  unit="°C"
                  chartOptions={{
                    xaxis: {
                      labels: {
                        show: false,
                      },
                    },
                    yaxis: {
                      labels: {
                        formatter: (value: number) => {
                          return value.toFixed(1);
                        },
                      },
                    },
                  }}
                ></TimeSeriesChart>
              </Suspense>
            </ChartWrapper>
          )}
          {opensensemapData.data.humidity24.length > 0 && (
            <ChartWrapper>
              <Suspense fallback={<Skeleton count={5} />}>
                <TimeSeriesChart
                  id="humidity"
                  series={[
                    {
                      name: 'rel. Luftfeuchte',
                      data: opensensemapData.data.humidity24,
                    },
                  ]}
                  title="rel. Luftfeuchte"
                  unit="%"
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
      </>
    </BaseWidgetComponent>
  );
};

export default OpenSenseMapComponent;
