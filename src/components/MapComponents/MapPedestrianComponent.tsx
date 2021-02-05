// @ts-nocheck

import React, { lazy, Suspense } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useSelector, RootStateOrAny } from 'react-redux';
import { Pedestrian } from '../Icons';

const MapMarker = lazy(() => import('./MapMarker'));

interface IPedestrianMarkersProps {
  visible: boolean;
}

const MapPedestrianComponent = React.memo(
  ({ visible }: IPedestrianMarkersProps) => {
    const pedestrianData: ServiceState = useSelector(
      (state: RootStateOrAny) => state.passanten
    );

    const Popup = (pedestrianSensor: any) => {
      return (
        pedestrianSensor && (
          <div style={{ padding: '1rem' }}>
            <p>
              <b>{pedestrianSensor.name}</b>
            </p>
            <p>
              Passanten letzte Stunde:{' '}
              {
                pedestrianSensor.measurements[
                  pedestrianSensor.measurements.length - 2
                ].pedestrians_count
              }
            </p>
            <p>Passanten heute: {pedestrianSensor.statistics.today_count}</p>
          </div>
        )
      );
    };

    return (
      <React.Fragment>
        {visible &&
          pedestrianData?.data?.length > 0 &&
          pedestrianData.data.map((pedestrianSensor: any) => (
            <Suspense
              key={pedestrianSensor.id}
              fallback={<Skeleton width="2rem" height="2rem" />}
            >
              <MapMarker
                color="blue"
                icon={<Pedestrian fill="#fff" />}
                longitude={pedestrianSensor.metadata.location.longitude}
                latitude={pedestrianSensor.metadata.location.latitude}
                title={pedestrianSensor.name}
                details={`${
                  pedestrianSensor.measurements[
                    pedestrianSensor.measurements.length - 2
                  ].pedestrians_count
                } letzte Stunde`}
                popup={Popup(pedestrianSensor)}
              ></MapMarker>
            </Suspense>
          ))}
      </React.Fragment>
    );
  }
);

export default MapPedestrianComponent;
