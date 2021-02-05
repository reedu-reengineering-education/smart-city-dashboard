// @ts-nocheck

import React, { lazy, Suspense, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useSelector, RootStateOrAny, useDispatch } from 'react-redux';
import { loadBicycleStationData } from '../../actions/bicycle';
import { Bicycle } from '../Icons';
import TimeSeriesChart from '../TimeSeriesChart';

const MapMarker = lazy(() => import('./MapMarker'));

interface IBicycleMarkersProps {
  visible: boolean;
}

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
];

const MapBicycleComponent = React.memo(({ visible }: IBicycleMarkersProps) => {
  const bicycleData: ServiceState = useSelector(
    (state: RootStateOrAny) => state.bicycle
  );

  const dispatch = useDispatch();

  useEffect(() => {
    bicycleStations.forEach((id: number) => {
      dispatch(loadBicycleStationData(id));
    });
  }, [dispatch]);

  const Popup = (bicycleStation: any) => {
    console.log(bicycleStation);
    return (
      <div style={{ padding: '1rem' }}>
        <p>
          <b>{bicycleStation.name}</b>
        </p>
        <Suspense fallback={<Skeleton count={5} />}>
          <TimeSeriesChart
            id="bicycles"
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
            }}
          ></TimeSeriesChart>
        </Suspense>
      </div>
    );
  };

  return (
    <React.Fragment>
      {visible &&
        bicycleData?.data?.length > 0 &&
        bicycleData.data
          .filter((e: any) => bicycleStations.includes(e.id))
          .map((bicycleStation: any) => (
            <Suspense
              key={bicycleStation.id}
              fallback={<Skeleton width="2rem" height="2rem" />}
            >
              <MapMarker
                color="blue"
                icon={<Bicycle fill="#fff" />}
                latitude={bicycleStation.latitude}
                longitude={bicycleStation.longitude}
                title={bicycleStation.name}
                details={`gestern ${
                  bicycleStation.data?.length > 0
                    ? bicycleStation.data[bicycleStation.data.length - 1].counts
                    : 0
                } Fahrräder`}
                popup={Popup(bicycleStation)}
              ></MapMarker>
            </Suspense>
          ))}
    </React.Fragment>
  );
});

export default MapBicycleComponent;
