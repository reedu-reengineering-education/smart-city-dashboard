import styled from 'styled-components';

export const ComponentWrapper = styled.div`
  background: linear-gradient(135deg, transparent, #f0f0f0);
  border-radius: 1rem;
  width: 100%;
  min-height: 250px;
  padding: 1rem;
  /* padding-bottom: 1rem; */
`;

export const HeadingWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 0.5rem;
  justify-content: space-between;
  flex-wrap: wrap;
`;

export const TilesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;
