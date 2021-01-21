import { animated, useSpring } from 'react-spring';

interface IAnimatedNumberProps {
  value: number;
  decimals?: number;
}

const AnimatedNumber = (props: IAnimatedNumberProps) => {
  const spring = useSpring({
    number: props.value,
    from: { number: 0 },
  });
  return (
    <animated.span>
      {spring.number.interpolate((val: any) => val.toFixed(props.decimals))}
    </animated.span>
  );
};

export default AnimatedNumber;
