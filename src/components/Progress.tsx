import React from 'react';
import styled from 'styled-components';

interface ProgressProps {
  id: number;
  title: string;
  value: number;
  max: number;
}

interface ProgressBarProps {
  value: number;
}

const ProgressComponentWrapper = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 1rem;
  align-items: center;
`;

const Title = styled.p`
  color: var(--scms-primary-blue);
  white-space: nowrap;
  margin: 0;
  margin-right: 1rem;
  font-weight: bold;
  font-size: smaller;
  width: 170px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ProgressWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 2rem;
  margin: 0 1rem;
  display: flex;
  align-items: center;
`;

const ProgressBar = styled.div`
  background-color: var(--scms-green);
  border-radius: 3px;
  position: relative;
  margin: 1rem 0;
  height: 3px;
  width: 100%;
`;

const ProgressKnobs = styled.div`
  position: absolute;
  width: 100%;
  display: flex;
`;

const ProgressKnob = styled.div`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: smaller;
  box-shadow: var(--scms-box-shadow-small);
  font-weight: var(--scms-semi-bold);
`;

const ProgressKnobHidden = styled(ProgressKnob)`
  visibility: hidden;
`;

const ProgressStart = styled(ProgressKnob)`
  background-color: var(--scms-primary-blue);
  position: absolute;
  left: 0;
  margin-left: -1rem;
  z-index: 1;
  border-radius: 0.25rem;
`;

const ProgressStatus = styled(ProgressKnob)<ProgressBarProps>`
  background-color: var(--scms-red);
  position: absolute;
  margin-left: -1rem;
  left: ${(props) => `${props.value}%` || '0%'};
  transition: 1s ease;
`;

const ProgressEnd = styled(ProgressKnob)`
  background-color: var(--scms-green);
  position: absolute;
  right: 0;
  margin-right: -1rem;
`;

const ProgressDone = styled.div<ProgressBarProps>`
  background: var(--scms-red);
  border-radius: 3px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: ${(props) => `${props.value}%` || '0%'};
  transition: 1s ease;
`;

export const Progress = (props: ProgressProps) => (
  <ProgressComponentWrapper>
    <Title>{props.title}</Title>
    <ProgressWrapper>
      <ProgressBar>
        <ProgressDone
          value={(1 - props.value / props.max) * 100}
        ></ProgressDone>
      </ProgressBar>
      <ProgressKnobs>
        <ProgressKnobHidden></ProgressKnobHidden>
        <ProgressStart>P{props.id}</ProgressStart>
        <ProgressEnd>{props.value}</ProgressEnd>
        <ProgressStatus value={(1 - props.value / props.max) * 100}>
          {props.max - props.value}
        </ProgressStatus>
      </ProgressKnobs>
    </ProgressWrapper>
  </ProgressComponentWrapper>
);
