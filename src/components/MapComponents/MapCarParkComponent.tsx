import React, { lazy, Suspense } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useSelector, RootStateOrAny } from 'react-redux';
import { CarParking } from '../Icons';
import OnlineStatus from '../OnlineStatus';

const MapMarker = lazy(() => import('./MapMarker'));

interface ICarParkMarkersProps {
  visible: boolean;
}

const MapCarParkComponent = React.memo(({ visible }: ICarParkMarkersProps) => {
  const parkhausData: ServiceState = useSelector(
    (state: RootStateOrAny) => state.parkhaus
  );

  const Popup = (carPark: any) => (
    <div style={{ padding: '1rem' }}>
      <p>
        <b>{carPark.properties.NAME}</b>
        <OnlineStatus
          online={carPark.properties.status === 'frei'}
        ></OnlineStatus>
      </p>
      <p>Anzahl Plätze: {carPark.properties.parkingTotal}</p>
      <p>Freie Plätze: {carPark.properties.parkingFree}</p>
    </div>
  );

  return (
    <React.Fragment>
      {visible &&
        parkhausData?.data?.features?.length > 0 &&
        parkhausData.data.features.map((carPark: any) => (
          <Suspense
            key={carPark.properties.LFDNR}
            fallback={<Skeleton width="2rem" height="2rem" />}
          >
            <MapMarker
              color="blue"
              icon={<CarParking fill="#fff" />}
              latitude={carPark.geometry.coordinates[1]}
              longitude={carPark.geometry.coordinates[0]}
              title={carPark.properties.NAME}
              details={`${carPark.properties.parkingFree} frei`}
              popup={Popup(carPark)}
            ></MapMarker>
          </Suspense>
        ))}
    </React.Fragment>
  );
});

export default MapCarParkComponent;
