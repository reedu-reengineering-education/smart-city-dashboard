import React from 'react';
import styled from 'styled-components';
import BaseAnimatedIcon from './BaseAnimatedIcon';

interface IAnimatedIconProps {
  start: boolean;
}
const IconStyled = styled.svg<{ animate: boolean; duration: number }>`
  #wolkepath {
    animation: ${({ animate, duration }) =>
      animate
        ? `wolkepathanimate ${duration}ms ease-in-out 3 normal forwards`
        : ''};
  }

  @keyframes wolkepathanimate {
    0% {
      transform: translate(0, 0px);
    }
    30% {
      transform: translate(0, -10px);
    }
    80% {
      transform: translate(0, 10px);
    }
    100% {
      transform: translate(0, 0px);
    }
  }
`;

const Cloud = (props: IAnimatedIconProps) => {
  return (
    <BaseAnimatedIcon
      start={props.start}
      AnimatedIconStyled={IconStyled}
      viewBox="135 125 56 56"
    >
      <g id="wolkegroup">
        <path
          id="wolkepath"
          d="M188.722081,159.860833C188.722081,156.471664,187.202237,153.463471,184.776584,151.578094C184.858875,151.033957,184.927146,150.477020,184.927146,149.909923C184.927146,143.773048,179.939906,138.798000,173.772553,138.798000C168.733094,138.798000,164.480987,142.120320,163.091387,146.683508C161.875106,144.801990,159.741840,143.552387,157.307449,143.552387C153.673235,143.552387,150.702836,146.335447,150.470186,149.853234C149.617001,149.637855,148.723179,149.523054,147.800911,149.523054C141.938745,149.523054,137.187000,154.151465,137.187000,159.861036C137.187000,165.570608,141.837761,170.199018,147.699926,170.199018C147.979309,170.199018,148.226589,170.185201,148.429776,170.164679L148.429776,170.164679L178.706354,170.198205L178.706354,170.198205C184.192623,170.177887,188.722081,165.558010,188.722081,159.860833Z"
        />
      </g>
    </BaseAnimatedIcon>
  );
};

export default Cloud;
