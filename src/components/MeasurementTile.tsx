import React from 'react';
import styled from 'styled-components';
// @ts-ignore
import AnimatedNumber from 'animated-number-react';

export enum Status {
  good,
  warning,
  bad,
}

interface MeasurementTileProps {
  title: string;
  location?: string;
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
        return 'var(--scms-orange)';
      default:
        return 'var(--scms-primary-blue)';
    }
  }};
  margin: 1rem;
  padding: 1rem;
  text-align: center;
  border-radius: 1rem;
  width: 150px;
  height: 150px;
  box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1),
    0 0px 0 1px rgba(10, 10, 10, 0.02);
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

export const MeasurementTile = (props: MeasurementTileProps) => {
  return (
    <MeasurementContainer status={props.status}>
      <p>
        <b>{props.location}</b>
      </p>
      <p className="is-size-2">
        <AnimatedNumber
          value={props.value}
          formatValue={(value: number) => {
            if (props.decimals != null) return value.toFixed(props.decimals);

            return value.toFixed(2);
          }}
        />
        <span className="is-size-5">{props.unit}</span>
      </p>
      <p>
        <b>{props.title}</b>
      </p>
    </MeasurementContainer>
  );
};
