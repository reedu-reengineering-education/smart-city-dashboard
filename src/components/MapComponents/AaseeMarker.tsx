import L from 'leaflet';
import React, { useEffect, useState } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Marker } from 'react-leaflet';
import { useSelector, RootStateOrAny } from 'react-redux';

import { PH, Water, WaterTemperature } from '../Icons';
import MapMarker from './MapMarker';

const AaseeMarker = () => {
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
    <>
      {aaseeData?.data?.metadata && sensorData?.parsed?.water_temperature && (
        <Marker
          position={[
            aaseeData?.data?.metadata?.location?.latitude,
            aaseeData?.data?.metadata?.location?.longitude,
          ]}
          icon={L.divIcon({
            className: '',
            html: renderToStaticMarkup(
              <MapMarker
                color="blue"
                icon={<WaterTemperature fill="#fff" />}
                title={'Wassertemperatur'}
                details={`${sensorData?.parsed?.water_temperature.toFixed(
                  2
                )} °C`}
              ></MapMarker>
            ),
            iconSize: [32, 32],
            iconAnchor: [16, 16],
          })}
        ></Marker>
      )}
      {aaseeData?.data?.metadata && sensorData?.parsed.pH && (
        <Marker
          position={[
            aaseeData?.data?.metadata?.location?.latitude,
            aaseeData?.data?.metadata?.location?.longitude,
          ]}
          icon={L.divIcon({
            className: '',
            html: renderToStaticMarkup(
              <MapMarker
                color="blue"
                icon={<PH fill="#fff" />}
                title={'PH Wert'}
                details={`${sensorData?.parsed?.pH.toFixed(2)}`}
              ></MapMarker>
            ),
            iconSize: [32, 32],
            iconAnchor: [16, 16],
          })}
        ></Marker>
      )}
      {aaseeData?.data?.metadata && oxygenSensorData?.parsed?.dissolved_oxygen && (
        <Marker
          position={[
            aaseeData?.data?.metadata?.location?.latitude,
            aaseeData?.data?.metadata?.location?.longitude,
          ]}
          icon={L.divIcon({
            className: '',
            html: renderToStaticMarkup(
              <MapMarker
                color="blue"
                icon={<Water fill="#fff" />}
                title={'Sauerstoffgehalt'}
                details={`${oxygenSensorData?.parsed?.dissolved_oxygen.toFixed(
                  2
                )} mg/L`}
              ></MapMarker>
            ),
            iconSize: [32, 32],
            iconAnchor: [16, 16],
          })}
        ></Marker>
      )}
    </>
  );
};

export default AaseeMarker;
