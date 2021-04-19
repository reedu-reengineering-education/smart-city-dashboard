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
Die Stadt Münster verfügt über ca. 6.100 Stellplätze für Autos in der Altstadt und dem Bahnhofsbereich. Zur besseren Orientierung und zur Vermeidung von Parksuchverkehren verfügt die Stadt Münster über ein modernes, dynamisches Parkleitsystem. Dort finden Sie Auskünfte über die genaue Lage der größeren öffentlich zugänglichen Parkplätze und Parkhäuser, die Ausstattung und die aktuelle Stellplatzkapazität: [http://www.stadt-muenster.de/tiefbauamt/parkleitsystem](http://www.stadt-muenster.de/tiefbauamt/parkleitsystem)
Weitere Informationen zu den Parkhäusern und Parkplätzen in Münster finden Sie auf [den Seiten des Amtes für Mobilität und Tiefbau der Stadt Münster](https://www.stadt-muenster.de/tiefbauamt/strassen/parken-in-muenster.html), sowie [auf der Homepage der Westfälische Bauindustrie GmbH (WBI)](https://www.wbi-muenster.de/parken-in-muenster/uebersicht.php)

Datenquelle: Amt für Mobilität und Tiefbau, Stadt Münster
Kontakt für inhaltliche Fragen:
Andreas Pott, [pott@stadt-muenster.de](mailto:pott@stadt-muenster.de)

**Daten im Open-Data-Portal:**
- [Aktuelle Parkhausbelegung](https://opendata.stadt-muenster.de/dataset/parkleitsystem-parkhausbelegung-aktuell)
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
