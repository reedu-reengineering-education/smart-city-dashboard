import React, { lazy, Suspense } from 'react';
import Skeleton from 'react-loading-skeleton';
import styled from 'styled-components';

const AaseeComponent = lazy(() => import('../views/AaseeComponent'));
const DateTimeComponent = lazy(() => import('../views/DateTimeComponent'));
const LogoComponent = lazy(() => import('../views/LogoComponent'));
const OpenSenseMapComponent = lazy(
  () => import('../views/OpenSenseMapComponent')
);
const ParkhausComponent = lazy(() => import('../views/ParkhausComponent'));
const PassantenComponent = lazy(() => import('../views/PassantenComponent'));
const RadfahrerComponent = lazy(() => import('../views/RadfahrerComponent'));

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
                <Suspense fallback={<Skeleton width="100%" height="100%" />}>
                  <LogoComponent></LogoComponent>
                </Suspense>
              </div>
              <div className="tile is-6 is-parent">
                <Suspense fallback={<Skeleton width="100%" height="100%" />}>
                  <ParkhausComponent></ParkhausComponent>
                </Suspense>
              </div>
              <div className="tile is-3 is-parent">
                <Suspense fallback={<Skeleton width="100%" height="100%" />}>
                  <DateTimeComponent></DateTimeComponent>
                </Suspense>
              </div>
            </div>
          </div>
        </div>
        <div className="tile">
          <div className="tile is-vertical is-4">
            <div className="tile is-parent">
              <Suspense fallback={<Skeleton width="100%" height="100%" />}>
                <RadfahrerComponent></RadfahrerComponent>
              </Suspense>
            </div>
          </div>
          <div className="tile is-vertical is-3">
            <div className="tile">
              <div className="tile is-parent">
                <Suspense fallback={<Skeleton width="100%" height="100%" />}>
                  <PassantenComponent></PassantenComponent>
                </Suspense>
              </div>
            </div>
          </div>

          <div className="tile is-vertical is-5">
            <div className="tile is-parent">
              <Suspense fallback={<Skeleton width="100%" height="100%" />}>
                <OpenSenseMapComponent></OpenSenseMapComponent>
              </Suspense>
            </div>
            <div className="tile">
              <div className="tile is-parent">
                <Suspense fallback={<Skeleton width="100%" height="100%" />}>
                  <AaseeComponent></AaseeComponent>
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </React.Fragment>
  );
}

export default Home;
