import styled from 'styled-components';
import { Marker, Popup } from 'react-map-gl';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { useEffect, useState, memo } from 'react';
import { setActivePopup } from '../../actions/map';
import React from 'react';

interface MapMarkerProps {
  color: 'blue' | 'green' | 'orange' | 'red';
  icon: JSX.Element;
  title?: string;
  details?: string;
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
  // const viewport = useSelector((state: RootStateOrAny) => state.map.viewport);

  // const dispatch = useDispatch();

  // const [popup, setPopup] = useState<JSX.Element>();
  // useEffect(() => {
  //   if (props.popup) {
  //     setPopup(
  //       <Popup
  //         tipSize={5}
  //         anchor="bottom"
  //         longitude={props.longitude}
  //         latitude={props.latitude}
  //         onClose={() => dispatch(setActivePopup(undefined))}
  //         offsetTop={-16}
  //       >
  //         {props.popup}
  //       </Popup>
  //     );
  //   }
  // }, [dispatch, props]);

  return React.createElement(
    CarParkMarker,
    null,
    <>
      {props.icon}
      <MarkerTitleCard
        // visible={viewport.zoom > (props.titleVisibleTreshold ?? 14)}
        visible={true}
      >
        {props.title}
      </MarkerTitleCard>
      <MarkerSideCard
        // visible={viewport.zoom > (props.detailsVisibleTreshold ?? 15)}
        visible={true}
      >
        {props.details}
      </MarkerSideCard>
    </>
  );
  // return (
  //   <CarParkMarker
  //   // onClick={() => {
  //   //   if (props.popup) dispatch(setActivePopup(popup));
  //   // }}
  //   >
  //     {props.icon}
  //     <>
  //       <MarkerTitleCard
  //         // visible={viewport.zoom > (props.titleVisibleTreshold ?? 14)}
  //         visible={true}
  //       >
  //         {props.title}
  //       </MarkerTitleCard>
  //       <MarkerSideCard
  //         // visible={viewport.zoom > (props.detailsVisibleTreshold ?? 15)}
  //         visible={true}
  //       >
  //         {props.details}
  //       </MarkerSideCard>
  //     </>
  //   </CarParkMarker>
  // );
};

export default MapMarker;
