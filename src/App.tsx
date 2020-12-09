import React from 'react';
import './App.scss';
import { RootStateOrAny, useSelector } from 'react-redux';
import styled from 'styled-components';
import NumberWidget from './components/NumberWidget';
import Navbar from './components/Navbar';
import OnlineStatus from './components/OnlineStatus';

const FlexContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

function App() {
  // get data from redux store
  const aaseeData = useSelector((state: RootStateOrAny) => state.aasee);
  const parkhausData = useSelector((state: RootStateOrAny) => state.parkhaus);
  const opensensemapData = useSelector(
    (state: RootStateOrAny) => state.opensensemap
  );

  return (
    <React.Fragment>
      <Navbar></Navbar>
      <div className="container is-fluid">
        <h1 className="title">
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
        )}
      </div>
    </React.Fragment>
  );
}

export default App;
