import React, { lazy, Suspense } from 'react';
import Skeleton from 'react-loading-skeleton';
import BaseWidgetComponent from '../components/BaseWidget';
import { Bicycle } from '../components/Icons';
import { Status } from '../components/MeasurementTile';
import { TilesWrapper } from '../components/styles';

const MeasurementTile = lazy(() => import('../components/MeasurementTile'));

const RadfahrerComponent = () => (
  <BaseWidgetComponent
    title="Radfahrende"
    icon={<Bicycle />}
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
    </TilesWrapper>
  </BaseWidgetComponent>
);

export default RadfahrerComponent;
