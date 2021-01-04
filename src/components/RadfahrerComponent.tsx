import React, { lazy, Suspense } from 'react';
import Skeleton from 'react-loading-skeleton';
import { Link } from 'react-router-dom';
import { Bicycle } from './Icons';
import { Status } from './MeasurementTile';
import {
  ComponentWrapper,
  FooterWrapper,
  HeadingWrapper,
  TilesWrapper,
  WidgetIcon,
} from './styles';

const MeasurementTile = lazy(() => import('../components/MeasurementTile'));

const RadfahrerComponent = () => (
  <ComponentWrapper>
    <HeadingWrapper>
      <WidgetIcon>
        <Bicycle></Bicycle>
      </WidgetIcon>
      <p className="is-size-5">Radfahrer</p>
    </HeadingWrapper>
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
    <FooterWrapper>
      <p>
        <Link to="/map">Karte öffnen</Link>
      </p>
      <p>Datenquelle</p>
    </FooterWrapper>
  </ComponentWrapper>
);

export default RadfahrerComponent;
