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

  const [temperature, setTemperature] = useState(0);
  const [ph, setPh] = useState(0);
  const [oxygen, setOxygen] = useState(0);

  useEffect(() => {
    if (aaseeData.data.data) {
      setTemperature(aaseeData.data.data.water_temperature[0].value);
      setPh(aaseeData.data.data.pH[0].value);
      setOxygen(aaseeData.data.data.dissolved_oxygen[0].value);
    }
  }, [aaseeData]);

  return (
    <>
      {aaseeData?.data?.metadata && temperature && (
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
                details={`${temperature.toFixed(2)} °C`}
              ></MapMarker>
            ),
            iconSize: [32, 32],
            iconAnchor: [16, 16],
          })}
        ></Marker>
      )}
      {aaseeData?.data?.metadata && ph && (
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
                details={`${ph.toFixed(2)}`}
              ></MapMarker>
            ),
            iconSize: [32, 32],
            iconAnchor: [16, 16],
          })}
        ></Marker>
      )}
      {aaseeData?.data?.metadata && oxygen && (
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
                details={`${oxygen.toFixed(2)} mg/L`}
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
