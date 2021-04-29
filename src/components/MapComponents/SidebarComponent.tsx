import React, { useEffect, useState } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { useMediaQuery } from 'beautiful-react-hooks';

import { updateFeaturesVisible } from '../../actions/map';

import {
  Humidity,
  CarParking,
  Bicycle,
  Pedestrian,
  ChevronLeft,
  ChevronRight,
  Water,
} from '../../components/Icons';

interface IconLabelProps {
  active?: boolean;
}

const IconLabel = styled.div<IconLabelProps>`
  min-height: 48px;
  font-weight: var(--scms-semi-bold);
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 1rem;
  padding-right: 2rem;
  cursor: pointer;
  background-color: ${(props) =>
    props.active ? 'rgba(255, 255, 255, 0.2)' : ''};

  > svg {
    width: 3rem;
  }

  :hover {
    background-color: rgba(255, 255, 255, 0.35);
  }
`;

interface ISidebarProps {
  collapsed: boolean;
}

const Sidebar = styled.div<ISidebarProps>`
  position: absolute;
  height: 100%;
  z-index: 1000;
  top: 0;
  color: white;
  background-color: rgba(0, 159, 227, 0.8);
  box-shadow: var(--scms-box-shadow);
  padding-top: 1rem;

  > ${IconLabel} {
    padding-right: ${(props) => (props.collapsed ? '1rem' : '2rem')};
  }
`;

const SidebarComponent = () => {
  const features = useSelector((state: RootStateOrAny) => state.map.features);
  const dispatch = useDispatch();

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const isSmall = useMediaQuery('(max-width: 48rem)');

  useEffect(() => {
    setSidebarCollapsed(isSmall);
  }, [isSmall]);

  return (
    <Sidebar collapsed={sidebarCollapsed}>
      <IconLabel
        onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
        style={{
          marginBottom: '1rem',
        }}
      >
        {/* Icons from FeatherIcons */}
        {!sidebarCollapsed ? (
          <>
            <ChevronLeft />
            <p>Minimieren</p>
          </>
        ) : (
          <ChevronRight />
        )}
      </IconLabel>
      <IconLabel
        active={features.opensensemap}
        onClick={() =>
          dispatch(
            updateFeaturesVisible({
              ...features,
              opensensemap: !features.opensensemap,
            })
          )
        }
      >
        <Humidity fill="#fff" />
        {!sidebarCollapsed && <p>Wetter</p>}
      </IconLabel>
      <IconLabel
        active={features.aasee}
        onClick={() =>
          dispatch(
            updateFeaturesVisible({
              ...features,
              aasee: !features.aasee,
            })
          )
        }
      >
        <Water fill="#fff" />
        {!sidebarCollapsed && <p>Wasserqualität Aasee</p>}
      </IconLabel>
      <IconLabel
        active={features.parking}
        onClick={() =>
          dispatch(
            updateFeaturesVisible({
              ...features,
              parking: !features.parking,
            })
          )
        }
      >
        <CarParking fill="#fff" />
        {!sidebarCollapsed && <p>Parkhäuser</p>}
      </IconLabel>
      <IconLabel
        active={features.pedestrians}
        onClick={() =>
          dispatch(
            updateFeaturesVisible({
              ...features,
              pedestrians: !features.pedestrians,
            })
          )
        }
      >
        <Pedestrian fill="#fff" />
        {!sidebarCollapsed && <p>Passant:innen</p>}
      </IconLabel>
      <IconLabel
        active={features.bicycle}
        onClick={() =>
          dispatch(
            updateFeaturesVisible({
              ...features,
              bicycle: !features.bicycle,
            })
          )
        }
      >
        <Bicycle fill="#fff" />
        {!sidebarCollapsed && <p>Fahrräder</p>}
      </IconLabel>
    </Sidebar>
  );
};

export default SidebarComponent;
