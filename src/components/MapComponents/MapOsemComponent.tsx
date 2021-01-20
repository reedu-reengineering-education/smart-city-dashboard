import React, { lazy, Suspense } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useSelector, RootStateOrAny } from 'react-redux';
import { Humidity, Pressure, Temperature } from '../Icons';
const MapMarker = lazy(() => import('./MapMarker'));

interface IOsemMarkersProps {
  visible: boolean;
}

const MapOsemComponent = React.memo(({ visible }: IOsemMarkersProps) => {
  const osemData: ServiceState = useSelector(
    (state: RootStateOrAny) => state.opensensemap
  );

  return (
    <React.Fragment>
      {visible &&
        osemData?.data?.live?.sensors?.length > 0 &&
        osemData?.data?.live?.sensors.map((sensor: any, index: number) => (
          <Suspense fallback={<Skeleton width="2rem" height="2rem" />}>
            <MapMarker
              color="blue"
              icon={
                <>
                  {sensor.title.includes('Temp') && <Temperature fill="#fff" />}
                  {sensor.title.includes('Luftf') && <Humidity fill="#fff" />}
                  {sensor.title.includes('Luftd') && <Pressure fill="#fff" />}
                </>
              }
              longitude={
                osemData.data.live.currentLocation.coordinates[0] +
                0.0005 * index
              }
              latitude={
                osemData.data.live.currentLocation.coordinates[1] -
                0.0005 * index
              }
              title={sensor.title}
              details={`${Number(sensor.lastMeasurement?.value).toFixed(2)} ${
                sensor.unit
              }`}
              popup={
                <b>{`${Number(sensor.lastMeasurement?.value).toFixed(2)} ${
                  sensor.unit
                }`}</b>
              }
            ></MapMarker>
          </Suspense>
        ))}
    </React.Fragment>
  );
});

export default MapOsemComponent;
