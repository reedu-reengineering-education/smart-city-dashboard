import styled from 'styled-components';

interface OnlineStatusProps {
  online: boolean;
}

const Dot = styled.span<OnlineStatusProps>`
  height: 15px;
  width: 15px;
  background-color: ${(props) => (props.online ? 'green' : 'red')};
  border-radius: 50%;
  display: inline-block;
  margin-left: 1rem;
  vertical-align: middle;
`;

const OnlineStatus = (props: OnlineStatusProps) => {
  return <Dot online={props.online}></Dot>;
};

export default OnlineStatus;
