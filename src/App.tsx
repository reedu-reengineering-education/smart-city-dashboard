import React from 'react';
import './App.css';
import Data from './components/Data';
import { RootStateOrAny, useSelector } from 'react-redux';

function App() {
  const aaseeData = useSelector((state: RootStateOrAny) => state.aasee);
  const parkhausData = useSelector((state: RootStateOrAny) => state.parkhaus);
  const opensensemapData = useSelector((state: RootStateOrAny) => state.osem);

  return (
    <div className="App">
      <Data title="Aasee" data={aaseeData}></Data>
      <Data title="Parkhaus" data={parkhausData}></Data>
      <Data title="openSenseMap" data={opensensemapData}></Data>
    </div>
  );
}

export default App;
