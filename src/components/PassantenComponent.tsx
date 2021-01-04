import React from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { updateFeaturesVisible } from '../actions/map';
import { MeasurementTile } from './MeasurementTile';
import { ComponentWrapper, FooterWrapper } from './styles';

const HeadingWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 0.5rem;
  justify-content: space-between;
  flex-wrap: wrap;
`;

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
        <p className="is-size-5">Passanten</p>
      </HeadingWrapper>
      <TilesWrapper>
        {pedestrianData?.data.length > 0 &&
          pedestrianData.data.map((p: any) => (
            <MeasurementTile
              key={p.id}
              footer={'letzte Stunde'}
              header={p.name}
              value={p.statistics.timerange_count}
              decimals={0}
            ></MeasurementTile>
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
