import React, { lazy, Suspense } from 'react';
import Skeleton from 'react-loading-skeleton';
import { RootStateOrAny, useSelector } from 'react-redux';
import styled from 'styled-components';
import BaseWidgetComponent from './BaseWidget';
import { Pedestrian } from './Icons';

const MeasurementTile = lazy(() => import('../components/MeasurementTile'));

const TilesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const PassantenComponent = () => {
  const pedestrianData: ServiceState = useSelector(
    (state: RootStateOrAny) => state.passanten
  );

  return (
    <BaseWidgetComponent
      title="Passanten"
      icon={<Pedestrian />}
      mapFeatureTag="pedestrians"
      dataSource="Hello World"
    >
      <TilesWrapper>
        {pedestrianData?.data.length > 0 &&
          pedestrianData.data.map((p: any) => (
            <Suspense
              key={p.id}
              fallback={<Skeleton width="100%" height="100%" />}
            >
              <MeasurementTile
                key={p.id}
                footer={'letzte Stunde'}
                header={p.name}
                value={p.statistics.timerange_count}
                decimals={0}
              ></MeasurementTile>
            </Suspense>
          ))}
      </TilesWrapper>
    </BaseWidgetComponent>
  );
};

export default PassantenComponent;
