import React, { useEffect, useState } from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import styled from 'styled-components';
import { MeasurementTile, Status } from './MeasurementTile';
import { ComponentWrapper } from './styles';

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

export const AaseeComponent = () => {
  const aaseeData: ServiceState = useSelector(
    (state: RootStateOrAny) => state.aasee
  );

  const [temperature, setTemperature] = useState(0);
  const [ph, setPh] = useState(0);

  useEffect(() => {
    if (aaseeData.data.data) {
      const sensorWithTempPh = aaseeData.data.data.packets.filter(
        (p: any) => 'water_temperature' in p.parsed
      )[0];

      if (sensorWithTempPh.parsed) {
        setTemperature(sensorWithTempPh.parsed.water_temperature);
        setPh(sensorWithTempPh.parsed.pH);
      }
    }
  }, [aaseeData]);

  return (
    <ComponentWrapper>
      <HeadingWrapper>
        <p className="is-size-5">
          Aasee
          <br />
          Wasserqualität
        </p>
      </HeadingWrapper>
      <TilesWrapper>
        <MeasurementTile
          title="Sauerstoffgehalt"
          value={7}
          unit="%"
          status={Status.warning}
        ></MeasurementTile>
        <MeasurementTile
          title="Temperatur"
          value={temperature}
          unit="°C"
          status={Status.bad}
        ></MeasurementTile>
        <MeasurementTile
          title="ph-Wert"
          value={ph}
          unit="ph"
          status={Status.good}
        ></MeasurementTile>
      </TilesWrapper>
    </ComponentWrapper>
  );
};
