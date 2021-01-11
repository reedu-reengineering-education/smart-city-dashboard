import React, { useEffect, useState } from 'react';
import { Marker, Popup } from 'react-map-gl';
import { useSelector, RootStateOrAny } from 'react-redux';
import styled from 'styled-components';

import { PH, Water, WaterTemperature } from '../Icons';

const AaseeMarker = styled.div`
  background-color: var(--scms-primary-blue);
  border-radius: 0.25rem;
  border: 1px solid white;
  width: 2rem;
  height: 2rem;
  color: white;
  box-shadow: var(--scms-box-shadow);
  font-weight: var(--scms-semi-bold);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: smaller;

  > svg {
    width: 2rem;
  }
`;

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

  const [popupInfo, setPopupInfo] = useState<any>(undefined);

  const _renderPopup = () => {
    const myInfo: any = popupInfo;

    const latitude = aaseeData.data.metadata.location.latitude;
    const longitude = aaseeData.data.metadata.location.longitude;

    return (
      popupInfo && (
        <Popup
          tipSize={5}
          anchor="bottom"
          longitude={
            myInfo.offset ? longitude + myInfo.offset * 0.0005 : longitude
          }
          latitude={
            myInfo.offset ? latitude - myInfo.offset * 0.0005 : latitude
          }
          onClose={() => setPopupInfo(undefined)}
          offsetTop={-16}
        >
          <div style={{ padding: '1rem' }}>
            <p>
              <b>{myInfo.text}</b>
            </p>
          </div>
        </Popup>
      )
    );
  };

  return (
    <React.Fragment>
      {visible && (
        <>
          <Marker
            longitude={aaseeData.data.metadata.location.longitude}
            latitude={aaseeData.data.metadata.location.latitude}
            offsetTop={-16}
            offsetLeft={-16}
          >
            <AaseeMarker
              onClick={() =>
                setPopupInfo({
                  text: `Temperatur: ${sensorData.parsed?.water_temperature.toFixed(
                    2
                  )} °C`,
                })
              }
            >
              <WaterTemperature fill="#fff" />
            </AaseeMarker>
          </Marker>
          <Marker
            // addding slight offset to location
            longitude={aaseeData.data.metadata.location.longitude + 0.0005}
            latitude={aaseeData.data.metadata.location.latitude - 0.0005}
            offsetTop={-16}
            offsetLeft={-16}
          >
            <AaseeMarker
              onClick={() =>
                setPopupInfo({
                  text: `PH Wert: ${sensorData.parsed?.pH.toFixed(2)}`,
                  offset: 1,
                })
              }
            >
              <PH fill="#fff" />
            </AaseeMarker>
          </Marker>
          <Marker
            // addding slight offset to location
            longitude={aaseeData.data.metadata.location.longitude + 0.001}
            latitude={aaseeData.data.metadata.location.latitude - 0.001}
            offsetTop={-16}
            offsetLeft={-16}
          >
            <AaseeMarker
              onClick={() =>
                setPopupInfo({
                  text: `Sauerstoffgehalt: ${oxygenSensorData.parsed?.dissolved_oxygen.toFixed(
                    2
                  )} mg/L`,
                  offset: 2,
                })
              }
            >
              <Water fill="#fff" />
            </AaseeMarker>
          </Marker>
        </>
      )}
      {_renderPopup()}
    </React.Fragment>
  );
});

export default MapAaseeComponent;
