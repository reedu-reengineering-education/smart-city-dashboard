import React, { useEffect, useState } from 'react';
import { Marker, Popup } from 'react-map-gl';
import { useSelector, RootStateOrAny } from 'react-redux';
import styled from 'styled-components';

import {
  Humidity,
  PH,
  Pressure,
  Temperature,
  Water,
  WaterTemperature,
} from '../Icons';

const OsemMarker = styled.div`
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

interface IOsemMarkersProps {
  visible: boolean;
}

const MapOsemComponent = React.memo(({ visible }: IOsemMarkersProps) => {
  const osemData: ServiceState = useSelector(
    (state: RootStateOrAny) => state.opensensemap
  );

  const [popupInfo, setPopupInfo] = useState<any>(undefined);

  const _renderPopup = () => {
    const myInfo: any = popupInfo;

    const longitude = osemData.data?.live.currentLocation.coordinates[0];
    const latitude = osemData.data?.live.currentLocation.coordinates[1];

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
      {visible &&
        osemData?.data?.live?.sensors?.length > 0 &&
        osemData?.data?.live?.sensors.map((sensor: any, index: number) => (
          <Marker
            key={index}
            // addding slight offset to location
            longitude={
              osemData.data.live.currentLocation.coordinates[0] + 0.0005 * index
            }
            latitude={
              osemData.data.live.currentLocation.coordinates[1] - 0.0005 * index
            }
            offsetTop={-16}
            offsetLeft={-16}
          >
            <OsemMarker
              onClick={() =>
                setPopupInfo({
                  text: `${sensor.title}: ${Number(
                    sensor.lastMeasurement?.value
                  ).toFixed(2)} ${sensor.unit}`,
                  offset: index,
                })
              }
            >
              {sensor.title.includes('Temp') && <Temperature fill="#fff" />}
              {sensor.title.includes('Luftf') && <Humidity fill="#fff" />}
              {sensor.title.includes('Luftd') && <Pressure fill="#fff" />}
            </OsemMarker>
          </Marker>
        ))}
      {osemData && osemData?.metadata?.online && _renderPopup()}
    </React.Fragment>
  );
});

export default MapOsemComponent;
