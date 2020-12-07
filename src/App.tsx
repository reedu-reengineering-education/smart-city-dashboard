import React from 'react';
import './App.scss';
import Data from './components/Data';
import { RootStateOrAny, useSelector } from 'react-redux';
import styled from 'styled-components';
import NumberWidget from './components/NumberWidget';

const FlexContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

function App() {
  const aaseeData = useSelector((state: RootStateOrAny) => state.aasee);
  const parkhausData = useSelector((state: RootStateOrAny) => state.parkhaus);
  const opensensemapData = useSelector((state: RootStateOrAny) => state.osem);

  return (
    <div>
      <h1 className="title">openSenseMap</h1>
      <FlexContainer>
        {opensensemapData.sensors && (
          <React.Fragment>
            <NumberWidget
              title={opensensemapData?.sensors[0].title}
              number={opensensemapData?.sensors[0].lastMeasurement.value}
              unit={opensensemapData?.sensors[0].unit}
            ></NumberWidget>
            <NumberWidget
              title={opensensemapData?.sensors[1].title}
              number={opensensemapData?.sensors[1].lastMeasurement.value}
              unit={opensensemapData?.sensors[1].unit}
            ></NumberWidget>
            <NumberWidget
              title={opensensemapData?.sensors[2].title}
              number={opensensemapData?.sensors[2].lastMeasurement.value}
              unit={opensensemapData?.sensors[2].unit}
            ></NumberWidget>
          </React.Fragment>
        )}
      </FlexContainer>
      <h1 className="title">Aasee</h1>
      <FlexContainer>
        {aaseeData.data && (
          <React.Fragment>
            <NumberWidget
              title="Wassertemperatur"
              number={
                aaseeData?.data.packets.filter(
                  (p: any) => 'water_temperature' in p.parsed
                )[0].parsed.water_temperature
              }
              unit="°C"
            ></NumberWidget>
          </React.Fragment>
        )}
      </FlexContainer>
      <Data title="Parkhaus" data={parkhausData}></Data>
    </div>
  );
}

export default App;
