import React, { useState } from 'react';
import { Marker, Popup } from 'react-map-gl';
import { useSelector, RootStateOrAny } from 'react-redux';
import styled from 'styled-components';
import { Pedestrian } from '../Icons';

const PedestrianMarker = styled.div`
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

interface IPedestrianMarkersProps {
  visible: boolean;
}

const MapPedestrianComponent = React.memo(
  ({ visible }: IPedestrianMarkersProps) => {
    const pedestrianData: ServiceState = useSelector(
      (state: RootStateOrAny) => state.passanten
    );

    const [popupInfo, setPopupInfo] = useState(undefined);

    const _renderPopup = () => {
      const myInfo: any = popupInfo;
      return (
        popupInfo && (
          <Popup
            tipSize={5}
            anchor="bottom"
            longitude={myInfo.metadata.location.longitude}
            latitude={myInfo.metadata.location.latitude}
            onClose={() => setPopupInfo(undefined)}
            offsetTop={-16}
          >
            <div style={{ padding: '1rem' }}>
              <p>
                <b>{myInfo.name}</b>
              </p>
              <p>
                Passanten letzte Stunde: {myInfo.statistics.timerange_count}
              </p>
              <p>Passanten heute: {myInfo.statistics.today_count}</p>
            </div>
          </Popup>
        )
      );
    };

    return (
      <React.Fragment>
        {visible &&
          pedestrianData?.data?.length > 0 &&
          pedestrianData.data.map((pedestrianSensor: any) => (
            <Marker
              key={pedestrianSensor.id}
              longitude={pedestrianSensor.metadata.location.longitude}
              latitude={pedestrianSensor.metadata.location.latitude}
              offsetTop={-16}
              offsetLeft={-16}
            >
              <PedestrianMarker onClick={() => setPopupInfo(pedestrianSensor)}>
                <Pedestrian fill="#fff" />
              </PedestrianMarker>
            </Marker>
          ))}
        {_renderPopup()})
      </React.Fragment>
    );
  }
);

export default MapPedestrianComponent;
