import React, { lazy, Suspense, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import BaseWidgetComponent from '../components/BaseWidget';
import Bicycle from '../resources/animated/Bicycle';
import { TilesWrapper, ChartWrapper } from '../components/styles';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { loadBicycleStationData } from '../actions/bicycle';
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

const bicycleStations = [
  100031297, // Promenade
  100020113, // Wolbecker
  100034980, // Hammer Str
  100034983, // Warendorfer
  100035541, // Neutor
  100034978, // Gartenstr
];

const RadfahrerComponent = () => {
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
    <BaseWidgetComponent
      title="Fahrräder"
      icon={Bicycle}
      mapFeatureTag="bicycle"
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
              series={
                bicycleData.data?.length > 0 &&
                bicycleData.data
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
              }
              title="Fahrräder letzte Woche"
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
                      return `${value.toFixed(0)}`;
                    },
                  },
                },
                chart: {
                  animations: {
                    animateGradually: {
                      enabled: false,
                    },
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
                    header={bicycleStation.name}
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
