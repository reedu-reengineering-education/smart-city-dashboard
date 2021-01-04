import React from 'react';
import styled from 'styled-components';
// @ts-ignore
import NumberEasing from 'react-number-easing';

export enum Status {
  good,
  warning,
  bad,
  dummy,
}

interface MeasurementTileProps {
  header: string;
  footer?: string;
  value: number;
  unit?: string;
  status?: Status;
  decimals?: number;
}

interface TileStyleProps {
  status?: Status;
}

const MeasurementContainer = styled.div<TileStyleProps>`
  background-color: ${(props) => {
    switch (props.status) {
      case Status.good:
        return 'var(--scms-green)';
      case Status.warning:
        return 'var(--scms-yellow)';
      case Status.bad:
        return 'var(--scms-red)';
      case Status.dummy:
        return 'lightgrey';
      default:
        return 'var(--scms-primary-blue)';
    }
  }};
  margin: 0.5rem;
  padding: 0.5rem;
  text-align: center;
  border-radius: 1rem;
  width: 9rem;
  height: 9rem;
  box-shadow: var(--scms-box-shadow);
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  justify-content: center;

  @media screen and (min-width: 769px) and (max-width: 960px) {
    width: 120px;
    height: 120px;
  }
`;

const TopText = styled.p`
  font-weight: var(--scms-semi-bold);
  hyphens: auto;
`;

const Value = styled.p`
  font-weight: var(--scms-semi-bold);
`;

const MeasurementTile = (props: MeasurementTileProps) => {
  return (
    <MeasurementContainer status={props.status}>
      <TopText>{props.header}</TopText>
      <Value className="is-size-2">
        <NumberEasing
          value={Number(props.value)}
          speed={1000}
          decimals={props.decimals != null ? props.decimals : 1}
          ease="expoInOut"
        />
        <wbr />
        <span className="is-size-5">{props.unit}</span>
      </Value>
      <p>{props.footer}</p>
    </MeasurementContainer>
  );
};

export default MeasurementTile;
