import React, { useEffect, useState } from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import styled from 'styled-components';
import { MeasurementTile } from './MeasurementTile';
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

const accessors = {
  xAccessor: (d: any) => {
    const date = new Date(d.createdAt);
    return date.toLocaleTimeString();
  },
  yAccessor: (d: any) => Number(d.value),
};

const groupAverage = (arr = [], n = 1) => {
  const res = [];
  for (let i = 0; i < arr.length; ) {
    let sum = 0;
    for (let j = 0; j < n; j++) {
      sum += +arr[i++] || 0;
    }
    res.push(sum / n);
  }
  return res;
};

export const OpenSenseMapComponent = () => {
  const opensensemapData: ServiceState = useSelector(
    (state: RootStateOrAny) => state.opensensemap
  );

  const [temperature, setTemperature] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [pressure, setPressure] = useState(0);

  useEffect(() => {
    if (opensensemapData.data.live.sensors?.length > 0) {
      setTemperature(
        opensensemapData.data.live.sensors[0].lastMeasurement.value
      );
      setHumidity(opensensemapData.data.live.sensors[1].lastMeasurement.value);
      setPressure(opensensemapData.data.live.sensors[2].lastMeasurement.value);
    }
  }, [opensensemapData]);

  return (
    <ComponentWrapper style={{ display: 'flex', flexDirection: 'column' }}>
      <HeadingWrapper>
        <p className="is-size-5">Wetter senseBox</p>
      </HeadingWrapper>
      <TilesWrapper>
        <MeasurementTile
          header="Temperatur"
          value={temperature}
          footer="in °C"
        ></MeasurementTile>
        <MeasurementTile
          header="rel. Luftfeuchte"
          value={humidity}
          footer="in %"
        ></MeasurementTile>
        <MeasurementTile
          header="Luftdruck"
          value={pressure}
          footer="in hPa"
          decimals={0}
        ></MeasurementTile>
      </TilesWrapper>
      <TilesWrapper style={{ flexGrow: 1 }}>
        {opensensemapData.data.temperature24.length > 0 && (
          <>{/* Place timeseries here... */}</>
        )}
      </TilesWrapper>
    </ComponentWrapper>
  );
};
