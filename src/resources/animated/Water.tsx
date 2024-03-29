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

import React from 'react';
import styled from 'styled-components';
import BaseAnimatedIcon from './BaseAnimatedIcon';

interface IAnimatedIconProps {
  start: boolean;
}
const IconStyled = styled.svg<{ animate: boolean; duration: number }>`
  #wassericonGroup1 {
    animation: ${({ animate, duration }) =>
      animate
        ? `wassericonGroupanimate1 ${duration}ms ease-in-out 3 normal forwards`
        : ''};
    transform: translate(67px, 28px);
  }

  @keyframes wassericonGroupanimate1 {
    0% {
      transform: translate(67px, 28px);
    }
    100% {
      transform: translate(97px, 28px);
    }
  }
`;

const Water = (props: IAnimatedIconProps) => {
  return (
    <BaseAnimatedIcon
      start={props.start}
      AnimatedIconStyled={IconStyled}
      viewBox="0 28 56 56"
    >
      <g id="wassericonGroup1">
        <g id="wassericonGroup2">
          <path
            id="wassericonPath"
            d="M13.931636,42.293026C14.361872,43.179876,14.599158,44.393125,14.588574,45.651960L14.588574,51.320160C14.605968,52.783137,14.309776,54.186652,13.780035,55.151443C13.255724,56.145238,12.569508,56.689133,11.859755,56.673459C7.374231,55.905259,3.042396,52.917948,-0.773663,47.961226C-5.393744,53.918327,-10.750187,56.946114,-16.186434,56.673459C-21.622681,56.946114,-26.979123,53.918327,-31.599204,47.961226C-36.230063,53.911312,-41.593517,56.938100,-47.037241,56.673459C-52.473132,56.940014,-57.828751,53.912694,-62.450012,47.961226C-66.266071,52.917948,-70.597906,55.905259,-75.083430,56.673459C-75.793183,56.689133,-76.479399,56.145238,-77.003710,55.151443C-77.533451,54.186652,-77.829643,52.783137,-77.812249,51.320160L-77.812249,45.651960C-77.822833,44.393125,-77.585547,43.179876,-77.155311,42.293026C-76.670271,41.354055,-76.047347,40.781036,-75.386632,40.666043C-71.516586,40.036054,-67.827525,37.000203,-64.799828,31.953810C-64.084716,30.771395,-63.185881,30.173947,-62.273144,30.274343C-61.402014,30.218941,-60.550250,30.814899,-59.872795,31.953810C-58.107771,34.915280,-56.094842,37.174897,-53.935088,38.619193C-49.340322,41.766751,-44.380425,41.766751,-39.785659,38.619193C-37.625905,37.174897,-35.612976,34.915280,-33.847953,31.953810C-33.135127,30.762540,-32.234619,30.163980,-31.321269,30.274343C-30.450139,30.218941,-29.598374,30.814899,-28.920919,31.953810C-27.155896,34.915280,-25.142967,37.174897,-22.983213,38.619193C-18.388447,41.766751,-13.428550,41.766751,-8.833784,38.619193C-6.674030,37.174897,-4.661101,34.915280,-2.896077,31.953810C-1.466631,29.723264,0.500441,29.723264,1.929888,31.953810C5.012783,37.045847,8.764827,40.082792,12.693561,40.666043C13.168361,40.970944,13.595630,41.532429,13.931636,42.293026Z"
            transform="matrix(1 0 0 1 -35.18139097500001 -17.13089052000003)"
          />
        </g>
      </g>
    </BaseAnimatedIcon>
  );
};

export default Water;
