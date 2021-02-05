import React, { lazy, useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useSelector, RootStateOrAny } from 'react-redux';

import { PH, Water, WaterTemperature } from '../Icons';
import MapMarker from './MapMarker';

// const MapMarker = lazy(() => import('./MapMarker'));

interface IAaseeMarkersProps {
  visible: boolean;
}

const AaseeMarker = () => {
  const aaseeData: ServiceState = useSelector(
    (state: RootStateOrAny) => state.aasee
  );

  const [sensorData, setSensorData] = useState<any>();
  const [oxygenSensorData, setOxygenSensorData] = useState<any>();

  // useEffect(() => {
  //   const sensor = aaseeData.data.data?.packets?.filter(
  //     (p: any) => 'water_temperature' in p.parsed
  //   )[0];
  //   setSensorData(sensor);

  //   const oxygenSensor = aaseeData.data.data?.packets?.filter(
  //     (p: any) => 'dissolved_oxygen' in p.parsed
  //   )[0];
  //   setOxygenSensorData(oxygenSensor);
  // }, [aaseeData]);

  return [
    {
      position: [
        aaseeData?.data?.metadata?.location?.longitude,
        aaseeData?.data?.metadata?.location?.latitude,
      ],
      text: 'Wassertemperatur',
      html: (
        <MapMarker
          color="blue"
          icon={<WaterTemperature fill="#fff" />}
          title={'Wassertemperatur'}
          details={`${sensorData?.parsed?.water_temperature.toFixed(2)} °C`}
        ></MapMarker>
      ),
    },
    {
      position: [
        aaseeData?.data?.metadata?.location?.longitude,
        aaseeData?.data?.metadata?.location?.latitude,
      ],
      text: 'Wassertemperatur',
      html: (
        <MapMarker
          color="blue"
          icon={<PH fill="#fff" />}
          title={'PH'}
          details={`${sensorData?.parsed?.pH.toFixed(2)} °C`}
        ></MapMarker>
      ),
    },
  ];

  // <MapMarker
  //   color="blue"
  //   icon={<PH fill="#fff" />}
  //   // addding slight offset to location
  //   longitude={aaseeData.data.metadata.location.longitude + 0.0005}
  //   latitude={aaseeData.data.metadata.location.latitude - 0.0005}
  //   title={'PH'}
  //   details={`${sensorData.parsed?.pH.toFixed(2)}`}
  //   popup={<b>{`PH Wert: ${sensorData.parsed?.pH.toFixed(2)}`}</b>}
  // ></MapMarker>
  // <MapMarker
  //   color="blue"
  //   icon={<Water fill="#fff" />}
  //   // addding slight offset to location
  //   longitude={aaseeData.data.metadata.location.longitude + 0.001}
  //   latitude={aaseeData.data.metadata.location.latitude - 0.001}
  //   title={'Sauerstoffgehalt'}
  //   details={`${oxygenSensorData.parsed?.dissolved_oxygen.toFixed(
  //     2
  //   )} mg/L`}
  //   popup={
  //     <b>{`Sauerstoffgehalt: ${oxygenSensorData.parsed?.dissolved_oxygen.toFixed(
  //       2
  //     )} mg/L`}</b>
  //   }
  // ></MapMarker>
};

export default AaseeMarker;
