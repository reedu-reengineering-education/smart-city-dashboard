import React, { lazy, Suspense } from 'react';
import Skeleton from 'react-loading-skeleton';
import BaseWidgetComponent from './BaseWidget';
import { Bicycle } from './Icons';
import { Status } from './MeasurementTile';
import { TilesWrapper } from './styles';

const MeasurementTile = lazy(() => import('../components/MeasurementTile'));

const RadfahrerComponent = () => (
  <BaseWidgetComponent
    title="Radfahrer"
    icon={<Bicycle />}
    mapFeatureTag="bicycle"
    dataSource="Hello World"
  >
    <TilesWrapper>
      <Suspense fallback={<Skeleton width="100%" height="100%" />}>
        <MeasurementTile
          header="Hammer Straße"
          value={123}
          decimals={0}
          footer="letzte Stunde"
          status={Status.dummy}
        ></MeasurementTile>
      </Suspense>
      <Suspense fallback={<Skeleton width="100%" height="100%" />}>
        <MeasurementTile
          header="Neutor"
          value={420}
          decimals={0}
          footer="letzte Stunde"
          status={Status.dummy}
        ></MeasurementTile>
      </Suspense>
      <Suspense fallback={<Skeleton width="100%" height="100%" />}>
        <MeasurementTile
          header="Wolbecker Str."
          value={654}
          decimals={0}
          footer="letzte Stunde"
          status={Status.dummy}
        ></MeasurementTile>
      </Suspense>
    </TilesWrapper>
  </BaseWidgetComponent>
);

export default RadfahrerComponent;
