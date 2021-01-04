import React, { lazy, Suspense, useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { RootStateOrAny, useSelector } from 'react-redux';
import styled from 'styled-components';
import BaseWidgetComponent from './BaseWidget';
import { Water } from './Icons';
import { Status } from './MeasurementTile';

const MeasurementTile = lazy(() => import('../components/MeasurementTile'));

const TilesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const AaseeComponent = () => {
  const aaseeData: ServiceState = useSelector(
    (state: RootStateOrAny) => state.aasee
  );

  const [temperature, setTemperature] = useState(0);
  const [ph, setPh] = useState(0);
  const [oxygen, setOxygen] = useState(0);

  useEffect(() => {
    if (aaseeData.data.data) {
      const sensorWithTempPh = aaseeData.data.data.packets.filter(
        (p: any) => 'water_temperature' in p.parsed
      )[0];

      if (sensorWithTempPh && sensorWithTempPh.parsed) {
        setTemperature(sensorWithTempPh.parsed.water_temperature);
        setPh(sensorWithTempPh.parsed.pH);
      }

      const sensorWithOxygen = aaseeData.data.data.packets.filter(
        (p: any) => 'dissolved_oxygen' in p.parsed
      )[0];

      if (sensorWithOxygen && sensorWithOxygen.parsed) {
        setOxygen(sensorWithOxygen.parsed.dissolved_oxygen);
      }
    }
  }, [aaseeData]);

  return (
    <BaseWidgetComponent
      title="Wasserqualität Aasee"
      icon={<Water />}
      mapFeatureTag="aasee"
      dataSource={`
# Hello World

This is the **Source** of open _data_

- hello
- world

`}
    >
      <TilesWrapper>
        <Suspense fallback={<Skeleton width="100%" height="100%" />}>
          <MeasurementTile
            header="Sauerstoff"
            value={oxygen}
            footer="in mg/L"
            status={Status.warning}
          ></MeasurementTile>
        </Suspense>
        <Suspense fallback={<Skeleton width="100%" height="100%" />}>
          <MeasurementTile
            header="Temperatur"
            value={temperature}
            footer="in °C"
            status={Status.bad}
          ></MeasurementTile>
        </Suspense>
        <Suspense fallback={<Skeleton width="100%" height="100%" />}>
          <MeasurementTile
            header="pH-Wert"
            value={ph}
            footer="pH"
            status={Status.good}
          ></MeasurementTile>
        </Suspense>
      </TilesWrapper>
    </BaseWidgetComponent>
  );
};

export default AaseeComponent;
