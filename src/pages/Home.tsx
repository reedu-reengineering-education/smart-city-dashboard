import React from 'react';
import styled from 'styled-components';
import { AaseeComponent } from '../components/AaseeComponent';
import { DateTimeComponent } from '../components/DateTimeComponent';
import { LogoComponent } from '../components/LogoComponent';
import { OpenSenseMapComponent } from '../components/OpenSenseMapComponent';
import { ParkhausComponent } from '../components/ParkhausComponent';
import { PassantenComponent } from '../components/PassantenComponent';
import { RadfahrerComponent } from '../components/RadfahrerComponent';

const Container = styled.div`
  max-width: 1632px !important;
`;

function Home() {
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
          <div className="tile is-vertical is-5">
            <div className="tile">
              <div className="tile is-parent">
                <AaseeComponent></AaseeComponent>
              </div>
            </div>
            <div className="tile">
              <div className="tile is-parent">
                <PassantenComponent></PassantenComponent>
              </div>
            </div>
          </div>
          <div className="tile is-vertical is-2">
            <div className="tile is-parent">
              <RadfahrerComponent></RadfahrerComponent>
            </div>
          </div>
          <div className="tile is-vertical is-5">
            <div className="tile is-parent">
              <OpenSenseMapComponent></OpenSenseMapComponent>
            </div>
          </div>
        </div>
      </Container>
    </React.Fragment>
  );
}

export default Home;
