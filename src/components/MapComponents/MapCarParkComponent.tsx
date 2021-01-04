import React, { useState } from 'react';
import { Marker, Popup } from 'react-map-gl';
import { useSelector, RootStateOrAny } from 'react-redux';
import styled from 'styled-components';
import OnlineStatus from '../OnlineStatus';

const CarParkMarker = styled.div`
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
`;

interface ICarParkMarkersProps {
  visible: boolean;
}

const MapCarParkComponent = React.memo(({ visible }: ICarParkMarkersProps) => {
  const parkhausData: ServiceState = useSelector(
    (state: RootStateOrAny) => state.parkhaus
  );

  const [popupInfo, setPopupInfo] = useState(undefined);

  const _renderPopup = () => {
    const myInfo: any = popupInfo;
    return (
      popupInfo && (
        <Popup
          tipSize={5}
          anchor="bottom"
          longitude={myInfo.geometry.coordinates[0]}
          latitude={myInfo.geometry.coordinates[1]}
          onClose={() => setPopupInfo(undefined)}
          offsetTop={-16}
        >
          <div style={{ padding: '1rem' }}>
            <p>
              <b>{myInfo.properties.NAME}</b>
              <OnlineStatus
                online={myInfo.properties.status === 'frei'}
              ></OnlineStatus>
            </p>
            <p>Anzahl Plätze: {myInfo.properties.parkingTotal}</p>
            <p>Freie Plätze: {myInfo.properties.parkingFree}</p>
          </div>
        </Popup>
      )
    );
  };

  return (
    <React.Fragment>
      {visible &&
        parkhausData?.data?.features?.length > 0 &&
        parkhausData.data.features.map((carPark: any) => (
          <Marker
            key={carPark.properties.LFDNR}
            longitude={carPark.geometry.coordinates[0]}
            latitude={carPark.geometry.coordinates[1]}
            offsetTop={-16}
            offsetLeft={-16}
          >
            <CarParkMarker onClick={() => setPopupInfo(carPark)}>
              P{carPark.properties.LFDNR}
            </CarParkMarker>
          </Marker>
        ))}
      {_renderPopup()}
    </React.Fragment>
  );
});

export default MapCarParkComponent;
