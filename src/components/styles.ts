import styled from 'styled-components';

export const ComponentWrapper = styled.div`
  background: linear-gradient(135deg, rgba(255, 255, 255, 0), #f0f0f0);
  border-radius: 1rem;
  width: 100%;
  min-height: 250px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

export const WidgetIcon = styled.div`
  > svg {
    width: 4.5rem;
    height: 4.5rem;
    margin: -1rem;
    margin-right: -0.5rem;
    margin-bottom: -1.5rem;
    fill: var(--scms-primary-blue);
    opacity: 0.3;
  }
`;

export const HeadingWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const TilesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  height: 100%;
  align-items: center;
`;

export const ChartWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

export const FooterWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
`;
