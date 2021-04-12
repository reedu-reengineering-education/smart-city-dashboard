import React, { useEffect, useState } from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import styled from 'styled-components';
import BaseWidgetComponent from '../components/BaseWidget';
import { Progress } from '../components/Progress';
import { HeadingWrapper } from '../components/styles';
import { IParkingState } from '../reducers/parkhaus';
import Parking from '../resources/animated/Parking';

const ParkhausProgressWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-height: 25rem;
  @media screen and (min-width: 788px) and (max-width: 1290px) {
    max-height: 42rem;
  }
  overflow-y: scroll;
  padding: 0.5rem;
`;

const ParkhausHeadingWrapper = styled(HeadingWrapper)`
  justify-content: space-between;
`;

const ProgressLegend = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0.5rem;

  > * {
    font-weight: bold;
    font-size: smaller;
  }

  > .blue {
    color: var(--scms-primary-blue);
  }

  > .red {
    color: var(--scms-red);
  }

  > .green {
    color: var(--scms-green);
  }
`;

const StatsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1rem;
`;

const StatusGreen = styled.span`
  color: var(--scms-green);
  font-weight: bold;
`;

const StatusRed = styled.span`
  color: var(--scms-red);
  font-weight: bold;
`;

const ParkhausComponent = () => {
  const parkhausData: IParkingState = useSelector(
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
    <BaseWidgetComponent
      mapFeatureTag="parking"
      icon={Parking}
      title="Parkhäuser"
      dataSource={`
**Beschreibung**

Lorem ipsum dolor sit amet, consetetur sadipscing elitr, 
sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, 
sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. 
Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. 
Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod 
tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.

**Datenquelle**

![Smart City Münster Logo](https://smartcity.ms/wp-content/uploads/2020/12/Smart-City-Mu%CC%88nster_Logo_20201210_RGB_240x62.png)

Stadt Münster - Smart City
`}
      headerOverride={
        <ParkhausHeadingWrapper>
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
        </ParkhausHeadingWrapper>
      }
    >
      <>
        <ProgressLegend>
          <p className="blue">Parkhaus</p>
          <p className="red">Belegte Plätze</p>
          <p className="green">Freie Plätze</p>
        </ProgressLegend>
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
      </>
    </BaseWidgetComponent>
  );
};

export default ParkhausComponent;
