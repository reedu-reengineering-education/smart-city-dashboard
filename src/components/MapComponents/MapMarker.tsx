import styled from 'styled-components';
import React from 'react';

interface MapMarkerProps {
  color: 'blue' | 'green' | 'orange' | 'red';
  icon: JSX.Element;
  title?: string;
  details?: string;
}

const BaseMapMarker = styled.div`
  background-color: var(--scms-primary-blue);
  border-bottom-left-radius: 0.25rem;
  border-bottom-right-radius: 0.25rem;
  border: 1px solid white;
  width: 2rem;
  height: 2rem;
  color: white;
  box-shadow: var(--scms-box-shadow);
  font-weight: var(--scms-semi-bold);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: small;

  > svg {
    width: 2rem;
    pointer-events: none;
  }
`;

const BaseMarkerCard = styled.div<{ visible: boolean }>`
  display: ${(props) => (props.visible ? 'inherit' : 'none')};
  position: absolute;
  border-radius: 0.25rem;
  border: 1px solid white;
  background-color: var(--scms-dark-grey);
  width: max-content;
  padding: 2px;
`;

const MarkerTitleCard = styled(BaseMarkerCard)`
  bottom: 100%;
  text-align: center;
`;

const MapMarker = (props: MapMarkerProps) => {
  return (
    <BaseMapMarker>
      {props.icon}
      <MarkerTitleCard visible={true}>
        {props.title}
        <br />
        {props.details}
      </MarkerTitleCard>
    </BaseMapMarker>
  );
};

export default MapMarker;
