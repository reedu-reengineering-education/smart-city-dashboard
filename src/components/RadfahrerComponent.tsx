import React from 'react';
import { Link } from 'react-router-dom';
import { MeasurementTile, Status } from './MeasurementTile';
import {
  ComponentWrapper,
  FooterWrapper,
  HeadingWrapper,
  TilesWrapper,
} from './styles';

const RadfahrerComponent = () => (
  <ComponentWrapper>
    <HeadingWrapper>
      <p className="is-size-5">Radfahrer</p>
    </HeadingWrapper>
    <TilesWrapper>
      <MeasurementTile
        header="Hammer Straße"
        value={123}
        decimals={0}
        footer="letzte Stunde"
        status={Status.dummy}
      ></MeasurementTile>
      <MeasurementTile
        header="Neutor"
        value={420}
        decimals={0}
        footer="letzte Stunde"
        status={Status.dummy}
      ></MeasurementTile>
      <MeasurementTile
        header="Wolbecker Straße"
        value={654}
        decimals={0}
        footer="letzte Stunde"
        status={Status.dummy}
      ></MeasurementTile>
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
