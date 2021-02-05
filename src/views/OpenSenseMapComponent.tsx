import React, { useEffect, useState, Suspense, lazy } from 'react';
import Skeleton from 'react-loading-skeleton';
import { RootStateOrAny, useSelector } from 'react-redux';
import BaseWidgetComponent from '../components/BaseWidget';
import { TilesWrapper, ChartWrapper } from '../components/styles';
import Cloud from '../resources/animated/Cloud';

const MeasurementTile = lazy(() => import('../components/MeasurementTile'));
const TimeSeriesChart = lazy(() => import('../components/TimeSeriesChart'));

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
      icon={Cloud}
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
      details={
        <ChartWrapper>
          {opensensemapData.data.temperature24.length > 0 &&
            opensensemapData.data.humidity24.length > 0 && (
              <Suspense fallback={<Skeleton count={5} />}>
                <TimeSeriesChart
                  id="weather"
                  type="line"
                  series={[
                    {
                      name: 'Temperatur',
                      data: opensensemapData.data.temperature24,
                    },
                    {
                      name: 'rel. Luftfeuchte',
                      data: opensensemapData.data.humidity24,
                    },
                  ]}
                  chartOptions={{
                    colors: ['#f28c00', '#009fe3'],
                    xaxis: {
                      labels: {
                        show: false,
                      },
                    },
                    yaxis: [
                      {
                        title: {
                          text: 'Temperatur in °C',
                        },
                        labels: {
                          formatter: (value: number) => {
                            return value.toFixed(1);
                          },
                        },
                      },
                      {
                        opposite: true,
                        title: {
                          text: 'rel. Luftfeuchte in %',
                        },
                        // max: 100.001, // adding the .001 still shows the hover dot on the line
                      },
                    ],
                    tooltip: {
                      y: {
                        formatter: (value: number, { seriesIndex }) => {
                          const unit = seriesIndex === 0 ? '°C' : '%';
                          return `${value.toFixed(1)} ${unit}`;
                        },
                      },
                    },
                  }}
                ></TimeSeriesChart>
              </Suspense>
            )}
        </ChartWrapper>
      }
    >
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
    </BaseWidgetComponent>
  );
};

export default OpenSenseMapComponent;
