import { useEffect, useState } from 'react';
import styled, { StyledComponent } from 'styled-components';

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
    setTimeout(() => {
      setAnimate(false);
    }, ANIMATION_DURATION);
  }, [animate]);

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
