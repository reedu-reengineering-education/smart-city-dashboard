import React, { useEffect, useState } from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Progress } from './Progress';
import { ComponentWrapper, HeadingWrapper } from './styles';

const ParkhausProgressWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-height: 9rem;
  overflow-y: scroll;
  padding: 0 1rem;
`;

const HeadingTitle = styled.p`
  @media only screen and (max-width: 440px) {
    width: 100%;
  }
`;

const StatsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StatusGreen = styled.span`
  color: var(--scms-green);
  font-weight: bold;
`;

const StatusRed = styled.span`
  color: var(--scms-red);
  font-weight: bold;
`;

const FooterWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 1rem;
  justify-content: space-around;
  flex-wrap: wrap;

  > p > a {
    color: inherit;
  }
`;

const ParkhausComponent = () => {
  const parkhausData: ServiceState = useSelector(
    (state: RootStateOrAny) => state.parkhaus
  );

  const [parkingTotal, setParkingTotal] = useState(0);
  const [carParkTotal, setCarParkTotal] = useState(0);
  const [freeTotal, setFreeTotal] = useState(0);

  useEffect(() => {
    if (parkhausData?.data?.features?.length > 0) {
      const parkingTotalReducer = (acc: any, curr: any) =>
        acc + Number(curr.properties?.parkingTotal);

      setParkingTotal(
        parkhausData?.data?.features?.reduce(parkingTotalReducer, 0)
      );

      setCarParkTotal(parkhausData?.data?.features?.length);

      const freeTotalReducer = (acc: any, curr: any) =>
        acc + Number(curr.properties?.parkingFree);

      setFreeTotal(parkhausData?.data?.features?.reduce(freeTotalReducer, 0));
    }
  }, [parkhausData]);

  return (
    <ComponentWrapper>
      <HeadingWrapper>
        <HeadingTitle className="is-size-5">Parkhäuser</HeadingTitle>
        <StatsWrapper>
          <p className="is-size-7">Parkplätze gesamt: {parkingTotal}</p>
          <p className="is-size-7">Parkhäuser gesamt: {carParkTotal}</p>
        </StatsWrapper>
        <StatsWrapper>
          <p className="is-size-7">
            Frei gesamt: <StatusGreen>{freeTotal}</StatusGreen>
          </p>
          <p className="is-size-7">
            Belegt gesamt: <StatusRed>{parkingTotal - freeTotal}</StatusRed>
          </p>
        </StatsWrapper>
      </HeadingWrapper>
      <ParkhausProgressWrapper>
        {parkhausData?.data?.features?.length > 0 &&
          parkhausData?.data?.features?.map((p: any) => (
            <Progress
              key={p.properties.LFDNR}
              id={p.properties.LFDNR}
              title={p.properties.NAME.replace('Parkhaus ', '')
                .replace('Parkplatz ', '')
                .replace('PH ', '')} // replace text we don't really need
              value={p.properties.parkingFree}
              max={p.properties.parkingTotal}
            ></Progress>
          ))}
      </ParkhausProgressWrapper>
      <FooterWrapper>
        <p>
          <Link to="/map">Karte öffnen</Link>
        </p>
        <p>Datenquelle</p>
      </FooterWrapper>
    </ComponentWrapper>
  );
};

export default ParkhausComponent;
