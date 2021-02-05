// @ts-nocheck

import React, { lazy, Suspense, useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useSelector, RootStateOrAny } from 'react-redux';

import { PH, Water, WaterTemperature } from '../Icons';

const MapMarker = lazy(() => import('./MapMarker'));

interface IAaseeMarkersProps {
  visible: boolean;
}

const MapAaseeComponent = React.memo(({ visible }: IAaseeMarkersProps) => {
  const aaseeData: ServiceState = useSelector(
    (state: RootStateOrAny) => state.aasee
  );

  const [sensorData, setSensorData] = useState<any>();
  const [oxygenSensorData, setOxygenSensorData] = useState<any>();

  useEffect(() => {
    const sensor = aaseeData.data.data?.packets?.filter(
      (p: any) => 'water_temperature' in p.parsed
    )[0];
    setSensorData(sensor);

    const oxygenSensor = aaseeData.data.data?.packets?.filter(
      (p: any) => 'dissolved_oxygen' in p.parsed
    )[0];
    setOxygenSensorData(oxygenSensor);
  }, [aaseeData]);

  return (
    <React.Fragment>
      {visible && sensorData && oxygenSensorData && (
        <>
          <Suspense fallback={<Skeleton width="2rem" height="2rem" />}>
            <MapMarker
              color="blue"
              icon={<WaterTemperature fill="#fff" />}
              longitude={aaseeData.data.metadata.location.longitude}
              latitude={aaseeData.data.metadata.location.latitude}
              title={'Wassertemperatur'}
              details={`${sensorData.parsed?.water_temperature.toFixed(2)} °C`}
              popup={
                <b>{`Temperatur: ${sensorData.parsed?.water_temperature.toFixed(
                  2
                )} °C`}</b>
              }
            ></MapMarker>
            <MapMarker
              color="blue"
              icon={<PH fill="#fff" />}
              // addding slight offset to location
              longitude={aaseeData.data.metadata.location.longitude + 0.0005}
              latitude={aaseeData.data.metadata.location.latitude - 0.0005}
              title={'PH'}
              details={`${sensorData.parsed?.pH.toFixed(2)}`}
              popup={<b>{`PH Wert: ${sensorData.parsed?.pH.toFixed(2)}`}</b>}
            ></MapMarker>
            <MapMarker
              color="blue"
              icon={<Water fill="#fff" />}
              // addding slight offset to location
              longitude={aaseeData.data.metadata.location.longitude + 0.001}
              latitude={aaseeData.data.metadata.location.latitude - 0.001}
              title={'Sauerstoffgehalt'}
              details={`${oxygenSensorData.parsed?.dissolved_oxygen.toFixed(
                2
              )} mg/L`}
              popup={
                <b>{`Sauerstoffgehalt: ${oxygenSensorData.parsed?.dissolved_oxygen.toFixed(
                  2
                )} mg/L`}</b>
              }
            ></MapMarker>
          </Suspense>
        </>
      )}
    </React.Fragment>
  );
});

export default MapAaseeComponent;
