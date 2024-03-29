/**
 * Smart City Münster Dashboard
 * Copyright (C) 2022 Reedu GmbH & Co. KG
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import styled from 'styled-components';
import BaseAnimatedIcon from './BaseAnimatedIcon';

interface IAnimatedIconProps {
  start: boolean;
}
const IconStyled = styled.svg<{ animate: boolean; duration: number }>`
  #someguypath {
    animation: ${({ animate, duration }) =>
      animate
        ? `someguyanimate ${duration}ms ease-in-out 3 normal forwards`
        : ''};
    transform: translate(30px, 30px);
  }
  @keyframes someguyanimate {
    0% {
      transform: translate(30px, 30px);
    }
    17% {
      transform: translate(30px, 22px);
    }
    34% {
      transform: translate(30px, 30px);
    }
    50% {
      transform: translate(30px, 22px);
    }
    67% {
      transform: translate(30px, 30px);
    }
    83% {
      transform: translate(30px, 22px);
    }
    100% {
      transform: translate(30px, 30px);
    }
  }
`;

const Pedestrian = (props: IAnimatedIconProps) => {
  return (
    <BaseAnimatedIcon
      start={props.start}
      AnimatedIconStyled={IconStyled}
      viewBox="28 28 56 56"
    >
      <g id="someguygroup">
        <path
          id="someguypath"
          d="M15.146773,41.059171C14.501102,40.100799,14.158558,38.970406,14.163641,37.814836L14.163641,29.949782C14.164217,28.481925,14.594873,27.046405,15.402387,25.820629C16.224621,24.576026,17.374533,23.582610,18.725372,22.949885C17.449050,21.248121,16.759109,19.178299,16.759109,17.051094C16.755391,12.833261,19.294477,9.029091,23.191040,7.414493C27.087604,5.799895,31.573193,6.693288,34.553793,9.677607C38.133614,13.255388,38.591581,18.900871,35.635238,23.008873C36.978155,23.617932,38.122805,24.592247,38.938560,25.820629C39.785011,27.054312,40.243744,28.512674,40.255957,30.008770L40.255957,37.873824C40.258588,39.026162,39.923644,40.154036,39.292488,41.118159C38.683862,42.092099,37.820279,42.880883,36.795333,43.399024L36.795333,48.275358C36.810226,49.888754,36.163592,51.437833,35.006033,52.561812C33.882054,53.719371,32.332976,54.366004,30.719579,54.351112L23.700019,54.351112C20.353399,54.329658,17.645718,51.621977,17.624265,48.275358L17.624265,43.340036C16.605386,42.820624,15.748476,42.031722,15.146773,41.059171ZM19.374239,37.814836C19.373966,38.038400,19.466543,38.252038,19.629853,38.404715C19.790399,38.570984,20.008506,38.669484,20.239395,38.679992L22.834863,38.679992L22.834863,48.216370C22.841989,48.442392,22.941488,48.655605,23.110140,48.806249C23.256132,48.981051,23.472270,49.081915,23.700019,49.081526L30.640928,49.081526C31.102502,49.044426,31.468984,48.677943,31.506084,48.216370L31.506084,38.679992L34.121215,38.679992C34.582788,38.642892,34.949271,38.276409,34.986371,37.814836L34.986371,29.949782C34.954514,28.536182,33.804824,27.403912,32.390903,27.393640L21.969707,27.393640C21.276289,27.388265,20.609994,27.662703,20.121513,28.154885C19.633032,28.647066,19.363631,29.315413,19.374239,30.008770ZM23.483730,13.295531C21.467291,15.339782,21.467291,18.624768,23.483730,20.669019C24.458506,21.652456,25.785794,22.205679,27.170474,22.205679C28.555153,22.205679,29.882441,21.652456,30.857217,20.669019C32.873656,18.624768,32.873656,15.339782,30.857217,13.295531C28.812967,11.279093,25.527980,11.279093,23.483730,13.295531Z"
          transform="translate(-28.365234,-28.373047)"
        />
      </g>
    </BaseAnimatedIcon>
  );
};

export default Pedestrian;
