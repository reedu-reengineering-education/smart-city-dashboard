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

export const OpenSenseMapComponent = () => {
  const opensensemapData: ServiceState = useSelector(
    (state: RootStateOrAny) => state.opensensemap
  );

  const [temperature, setTemperature] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [pressure, setPressure] = useState(0);

  useEffect(() => {
    console.log(opensensemapData);
    if (opensensemapData.data.sensors?.length > 0) {
      setTemperature(opensensemapData.data.sensors[0].lastMeasurement.value);
      setHumidity(opensensemapData.data.sensors[1].lastMeasurement.value);
      setPressure(opensensemapData.data.sensors[2].lastMeasurement.value);
    }
  }, [opensensemapData]);

  return (
    <ComponentWrapper>
      <HeadingWrapper>
        <p className="is-size-5">Wetter senseBox</p>
      </HeadingWrapper>
      <TilesWrapper>
        <MeasurementTile
          title="Temperatur"
          value={temperature}
          unit="°C"
        ></MeasurementTile>
        <MeasurementTile
          title="rel. Luftfeuchte"
          value={humidity}
          unit="%"
        ></MeasurementTile>
        <MeasurementTile
          title="Luftdruck"
          value={pressure}
          unit="hPa"
          decimals={0}
        ></MeasurementTile>
      </TilesWrapper>
    </ComponentWrapper>
  );
};
