import React from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import styled from 'styled-components';
import { AaseeComponent } from '../components/AaseeComponent';
import { DateTimeComponent } from '../components/DateTimeComponent';
import { LogoComponent } from '../components/LogoComponent';
import NumberWidget from '../components/NumberWidget';
import OnlineStatus from '../components/OnlineStatus';
import { ParkhausComponent } from '../components/ParkhausComponent';
import { PassantenComponent } from '../components/PassantenComponent';
import { RadfahrerComponent } from '../components/RadfahrerComponent';

const Container = styled.div`
  margin-top: 32px;
`;

function Home() {
  // get data from redux store

  const opensensemapData: ServiceState = useSelector(
    (state: RootStateOrAny) => state.opensensemap
  );

  return (
    <React.Fragment>
      <Container className="container">
        <div className="tile">
          <div className="tile is-vertical">
            <div className="tile">
              <div className="tile is-3 is-parent is-horizontal">
                <LogoComponent></LogoComponent>
              </div>
              <div className="tile is-6 is-parent">
                <ParkhausComponent></ParkhausComponent>
              </div>
              <div className="tile is-3 is-parent">
                <DateTimeComponent></DateTimeComponent>
              </div>
            </div>
          </div>
        </div>
        <div className="tile">
          <div className="tile is-vertical is-6">
            <div className="tile">
              <div className="tile is-parent">
                <RadfahrerComponent></RadfahrerComponent>
              </div>
            </div>
            <div className="tile">
              <div className="tile is-parent">
                <PassantenComponent></PassantenComponent>
              </div>
            </div>
          </div>
          <div className="tile is-vertical is-6">
            <div className="tile is-parent">
              <AaseeComponent></AaseeComponent>
            </div>
          </div>
        </div>

        {/* <GridLayout>
          <LogoComponent></LogoComponent>
          <ParkhausComponent></ParkhausComponent>
          <DateTimeComponent></DateTimeComponent>
          <RadfahrerComponent></RadfahrerComponent>
          <PassantenComponent></PassantenComponent>
          <AaseeComponent></AaseeComponent>
        </GridLayout> */}
        {/* <h1 className="title">
          {opensensemapData?.metadata.title}
          <OnlineStatus
            online={opensensemapData?.metadata.online}
          ></OnlineStatus>
        </h1>
        {opensensemapData?.metadata.updatedAt && (
          <h2 className="subtitle">
            Updated at:{' '}
            {(opensensemapData?.metadata?.updatedAt as Date).toLocaleString()}
          </h2>
        )}
        <FlexContainer>
          {opensensemapData?.data.sensors && (
            <React.Fragment>
              <NumberWidget
                title={opensensemapData?.data.sensors[0].title}
                number={opensensemapData?.data.sensors[0].lastMeasurement.value}
                unit={opensensemapData?.data.sensors[0].unit}
              ></NumberWidget>
              <NumberWidget
                title={opensensemapData?.data.sensors[1].title}
                number={opensensemapData?.data.sensors[1].lastMeasurement.value}
                unit={opensensemapData?.data.sensors[1].unit}
              ></NumberWidget>
              <NumberWidget
                title={opensensemapData?.data.sensors[2].title}
                number={opensensemapData?.data.sensors[2].lastMeasurement.value}
                unit={opensensemapData?.data.sensors[2].unit}
              ></NumberWidget>
            </React.Fragment>
          )}
        </FlexContainer>
        <h1 className="title">
          {aaseeData?.metadata.title}
          <OnlineStatus online={aaseeData?.metadata.online}></OnlineStatus>
        </h1>
        {aaseeData?.metadata.updatedAt && (
          <h2 className="subtitle">
            Updated at:{' '}
            {(aaseeData?.metadata?.updatedAt as Date).toLocaleString()}
          </h2>
        )}
        <FlexContainer>
          {aaseeData.data.data && (
            <React.Fragment>
              <NumberWidget
                title="Wassertemperatur"
                number={
                  // TODO: filter somewhere else
                  aaseeData?.data.data.packets.filter(
                    (p: any) => 'water_temperature' in p.parsed
                  )[0].parsed.water_temperature as number
                }
                unit="°C"
              ></NumberWidget>
              <NumberWidget
                title="pH"
                number={
                  // TODO: filter somewhere else
                  aaseeData?.data.data.packets.filter(
                    (p: any) => 'pH' in p.parsed
                  )[0].parsed.pH as number
                }
              ></NumberWidget>
            </React.Fragment>
          )}
        </FlexContainer>
        <h1 className="title">
          {parkhausData?.metadata.title}
          <OnlineStatus online={parkhausData?.metadata.online}></OnlineStatus>
        </h1>
        {parkhausData?.metadata.updatedAt && (
          <h2 className="subtitle">
            Updated at:{' '}
            {(parkhausData?.metadata?.updatedAt as Date).toLocaleString()}
          </h2>
        )}
        {parkhausData?.data?.features && (
          <FlexContainer>
            {parkhausData?.data?.features.map((p: any) => (
              <NumberWidget
                key={p.properties.LFDNR}
                title={p.properties.NAME}
                number={p.properties.parkingFree}
                unit={'freie Parkplätze'}
                decimals={0 as number}
              ></NumberWidget>
            ))}
          </FlexContainer>
        )} */}
      </Container>
    </React.Fragment>
  );
}

export default Home;
