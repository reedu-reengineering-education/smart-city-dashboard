import styled from 'styled-components';

export const ComponentWrapper = styled.div`
  background: linear-gradient(135deg, transparent, #f0f0f0);
  border-radius: 1rem;
  width: 100%;
  min-height: 250px;
  padding-top: 1rem;
  padding-bottom: 1rem;
  padding-left: 2rem;
  padding-right: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
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

export const FooterWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 1rem;
  justify-content: space-around;
  flex-wrap: wrap;

  > p {
    margin-left: 1rem;
    margin-right: 1rem;
  }

  > p > a {
    color: inherit;
  }
`;
