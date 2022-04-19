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

import { useEffect, useState } from 'react';
import { StyledComponent } from 'styled-components';

interface IAnimatedIconProps {
  start: boolean;
  AnimatedIconStyled: StyledComponent<
    'svg',
    any,
    {
      animate: boolean;
      duration: number;
    },
    never
  >;
  viewBox: string;
  children: JSX.Element;
  duration?: number;
  loops?: number;
}

const BaseAnimatedIcon = (props: IAnimatedIconProps) => {
  const ANIMATION_DURATION = props.duration ?? 1500;
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timerID = setTimeout(() => {
      setAnimate(false);
    }, ANIMATION_DURATION);

    return () => {
      clearTimeout(timerID);
    };
  }, [animate, ANIMATION_DURATION]);

  useEffect(() => {
    if (props.start) {
      setAnimate(true);
    }
  }, [props.start]);

  return (
    <props.AnimatedIconStyled
      animate={animate}
      duration={ANIMATION_DURATION}
      onClick={() => setAnimate(true)}
      shape-rendering="geometricPrecision"
      text-rendering="geometricPrecision"
      viewBox={props.viewBox}
      width="56"
      height="56"
    >
      {props.children}
    </props.AnimatedIconStyled>
  );
};

export default BaseAnimatedIcon;
