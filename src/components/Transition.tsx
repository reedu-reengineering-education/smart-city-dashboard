import {
  TransitionGroup,
  Transition as ReactTransition,
} from 'react-transition-group';

export const TIMEOUT = 150;
const getTransitionStyles = {
  entering: {
    position: `absolute`,
    opacity: 0,
    transform: `translateX(25px)`,
    height: '100%',
  },
  entered: {
    transition: `opacity ${TIMEOUT}ms ease-in-out, transform ${TIMEOUT}ms ease-in-out`,
    opacity: 1,
    transform: `translateX(0px)`,
    height: '100%',
  },
  exiting: {
    transition: `opacity ${TIMEOUT}ms ease-in-out, transform ${TIMEOUT}ms ease-in-out`,
    opacity: 0,
    transform: `translateX(-25px)`,
    height: '100%',
  },
};

type TransitionProps = {
  children: JSX.Element;
  location: any;
};

const Transition = ({ children, location }: TransitionProps) => {
  return (
    <TransitionGroup
      style={{ position: 'relative', height: 'calc(100% - 64px)' }}
    >
      <ReactTransition
        key={location}
        timeout={{
          enter: TIMEOUT,
          exit: TIMEOUT,
        }}
      >
        {(status) => (
          <div
            style={{
              // @ts-ignore
              ...getTransitionStyles[status],
            }}
          >
            {children}
          </div>
        )}
      </ReactTransition>
    </TransitionGroup>
  );
};
export default Transition;
