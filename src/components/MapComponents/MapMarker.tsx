import styled from 'styled-components';
import { Marker, Popup } from 'react-map-gl';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { setActivePopup } from '../../actions/map';

interface MapMarkerProps {
  latitude: number;
  longitude: number;
  color: 'blue' | 'green' | 'orange' | 'red';
  icon: JSX.Element;
  title?: string;
  details?: string;
  titleVisibleTreshold?: number;
  detailsVisibleTreshold?: number;
  popup?: JSX.Element;
}

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
`;

const MarkerSideCard = styled(BaseMarkerCard)`
  left: 100%;
  border-bottom-left-radius: 0;
  border-top-left-radius: 0;
  border-left: none;
`;

const MapMarker = (props: MapMarkerProps) => {
  const viewport = useSelector((state: RootStateOrAny) => state.map.viewport);

  const dispatch = useDispatch();

  const [popup, setPopup] = useState<JSX.Element>();
  useEffect(() => {
    if (props.popup) {
      setPopup(
        <Popup
          tipSize={5}
          anchor="bottom"
          longitude={props.longitude}
          latitude={props.latitude}
          onClose={() => dispatch(setActivePopup(undefined))}
          offsetTop={-16}
        >
          {props.popup}
        </Popup>
      );
    }
  }, [dispatch, props]);

  return (
    <>
      <Marker
        longitude={props.longitude}
        latitude={props.latitude}
        offsetTop={-16}
        offsetLeft={-16}
      >
        <CarParkMarker
          onClick={() => {
            if (props.popup) dispatch(setActivePopup(popup));
          }}
        >
          {props.icon}
          <>
            <MarkerTitleCard
              visible={viewport.zoom > (props.titleVisibleTreshold ?? 14)}
            >
              {props.title}
            </MarkerTitleCard>
            <MarkerSideCard
              visible={viewport.zoom > (props.detailsVisibleTreshold ?? 15)}
            >
              {props.details}
            </MarkerSideCard>
          </>
        </CarParkMarker>
      </Marker>
    </>
  );
};

export default MapMarker;
