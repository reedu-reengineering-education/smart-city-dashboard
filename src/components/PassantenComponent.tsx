import React, { lazy, Suspense } from 'react';
import Skeleton from 'react-loading-skeleton';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { updateFeaturesVisible } from '../actions/map';
import { Pedestrian } from './Icons';
import {
  ComponentWrapper,
  FooterWrapper,
  WidgetIcon,
  HeadingWrapper,
} from './styles';

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
  const dispatch = useDispatch();

  return (
    <ComponentWrapper>
      <HeadingWrapper>
        <WidgetIcon>
          <Pedestrian></Pedestrian>
        </WidgetIcon>
        <p className="is-size-5">Passanten</p>
      </HeadingWrapper>
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
      <FooterWrapper>
        <p
          onClick={() =>
            dispatch(
              updateFeaturesVisible({
                pedestrians: true,
              })
            )
          }
        >
          <Link to="/map">Karte öffnen</Link>
        </p>
        <p>Datenquelle</p>
      </FooterWrapper>
    </ComponentWrapper>
  );
};

export default PassantenComponent;
