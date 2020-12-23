import React from 'react';
import { MeasurementTile, Status } from './MeasurementTile';
import { ComponentWrapper, HeadingWrapper, TilesWrapper } from './styles';

export const RadfahrerComponent = () => (
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
  </ComponentWrapper>
);
