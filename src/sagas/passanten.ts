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

import { call, delay, put, takeEvery } from 'redux-saga/effects';
import {
  LOAD_PEDESTRIAN_DATA,
  LOAD_PEDESTRIAN_DATA_FAILED,
  LOAD_PEDESTRIAN_TIMESERIES_DATA,
  RENDER_PEDESTRIAN_DATA,
} from '../actions/passanten';

// update interval in seconds
const INTERVAL = 60; // 1 minute

export function* fetchPedestrianDataPeriodically() {
  while (true) {
    yield call(fetchPedestrianData);
    yield delay(INTERVAL * 1000);
  }
}

export function* fetchPedestrianData(): any {
  try {
    const endpoint = `${process.env.REACT_APP_API_URL}/pedestrian`;
    const response = yield call(fetch, endpoint);
    const data = yield response.json();
    yield put({ type: RENDER_PEDESTRIAN_DATA, pedestrian: data });
  } catch (error) {
    yield put({ type: LOAD_PEDESTRIAN_DATA_FAILED, error });
  }
}

export function* fetchPedestrianTimeseriesData(action: {
  type: string;
  from: Date;
  to: Date;
}): any {
  try {
    const endpoint = `${
      process.env.REACT_APP_API_URL
    }/pedestrian/timeseries?from=${action.from.toISOString()}&to=${action.to.toISOString()}`;
    const response = yield call(fetch, endpoint);
    const data = yield response.json();
    console.log(endpoint, data);
    yield put({ type: RENDER_PEDESTRIAN_DATA, pedestrian: data });
  } catch (error) {
    yield put({ type: LOAD_PEDESTRIAN_DATA_FAILED, error });
  }
}

export function* loadPedestrianData() {
  yield takeEvery(LOAD_PEDESTRIAN_DATA, fetchPedestrianDataPeriodically);
}

export function* loadPedestrianTimeseriesData() {
  yield takeEvery(
    LOAD_PEDESTRIAN_TIMESERIES_DATA,
    fetchPedestrianTimeseriesData
  );
}
