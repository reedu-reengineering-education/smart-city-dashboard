/**
 * Smart City Münster Dashboard
 * Copyright (C) 2022 Reedu GmbH & Co. KG
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

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

/**
 *
 * @returns The landing page with all dashboard components
 */
function Home() {
  return (
    <React.Fragment>
      <Container className="container">
        <div className="tile">
          <div className="tile is-vertical">
            <div className="tile">
              <div className="tile is-2 is-parent is-horizontal">
                <Suspense fallback={<Skeleton width="100%" height="100%" />}>
                  <LogoComponent></LogoComponent>
                </Suspense>
              </div>
              <div className="tile is-8 is-parent">
                <Suspense fallback={<Skeleton width="100%" height="100%" />}>
                  <RadfahrerComponent></RadfahrerComponent>
                </Suspense>
              </div>
              <div className="tile is-2 is-parent">
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
                <ParkhausComponent></ParkhausComponent>
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
