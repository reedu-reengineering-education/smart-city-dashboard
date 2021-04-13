import React, { lazy, Suspense, useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { loadAaseeData, loadAaseeTimeseriesData } from '../actions/aasee';
import BaseWidgetComponent from '../components/BaseWidget';
import { ChartWrapper, TilesWrapper } from '../components/styles';
import TimeSeriesChart from '../components/TimeSeriesChart';
import Water from '../resources/animated/Water';

const MeasurementTile = lazy(() => import('../components/MeasurementTile'));

const AaseeComponent = () => {
  const aaseeData: ServiceState = useSelector(
    (state: RootStateOrAny) => state.aasee
  );

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(false);
  }, [aaseeData]);

  const [temperature, setTemperature] = useState(0);
  const [ph, setPh] = useState(0);
  const [oxygen, setOxygen] = useState(0);

  useEffect(() => {
    if (aaseeData.data.data) {
      setTemperature(aaseeData.data.data.water_temperature[0].value);
      setPh(aaseeData.data.data.pH[0].value);
      setOxygen(aaseeData.data.data.dissolved_oxygen[0].value);
    }
  }, [aaseeData]);

  return (
    <BaseWidgetComponent
      title="Wasserqualität Aasee"
      icon={Water}
      mapFeatureTag="aasee"
      loading={loading}
      detailsDefault={true}
      show24h={() => {
        setLoading(true);
        dispatch(loadAaseeData());
      }}
      show7d={() => {
        setLoading(true);
        let from = new Date();
        from.setDate(from.getDate() - 7);

        dispatch(loadAaseeTimeseriesData(from));
      }}
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
          <Suspense fallback={<Skeleton count={5} />}>
            <TimeSeriesChart
              id="bicycles"
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
                colors: ['#f28c00', '#009fe3', '#86bc25'],
                yaxis: {
                  labels: {
                    formatter: (value: number) => {
                      return value.toFixed(1);
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
                    formatter: (value: number, { seriesIndex }) => {
                      const units = ['°C', 'mg/L', ''];
                      const unit = units[seriesIndex];
                      return `${value.toFixed(1)} ${unit}`;
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
      <TilesWrapper>
        <Suspense fallback={<Skeleton width="100%" height="100%" />}>
          <MeasurementTile
            header="Sauerstoff"
            value={oxygen}
            footer="in mg/L"
          ></MeasurementTile>
        </Suspense>
        <Suspense fallback={<Skeleton width="100%" height="100%" />}>
          <MeasurementTile
            header="Temperatur"
            value={temperature}
            footer="in °C"
          ></MeasurementTile>
        </Suspense>
        <Suspense fallback={<Skeleton width="100%" height="100%" />}>
          <MeasurementTile
            header="pH-Wert"
            value={ph}
            footer="pH"
          ></MeasurementTile>
        </Suspense>
      </TilesWrapper>
    </BaseWidgetComponent>
  );
};

export default AaseeComponent;
