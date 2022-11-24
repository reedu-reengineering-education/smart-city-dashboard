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
  LOAD_BICYCLE_DATA,
  LOAD_BICYCLE_STATION_DATA,
  LOAD_BICYCLE_DATA_FAILED,
  RENDER_BICYCLE_DATA,
  RENDER_BICYCLE_STATION_DATA,
  LOAD_BICYCLE_TIMESERIES_DATA,
} from '../actions/bicycle';

// update interval in seconds
const INTERVAL = 3600; // each hour

// static
export function* fetchBicycleDataPeriodically() {
  while (true) {
    yield call(fetchBicycleData);
    yield delay(INTERVAL * 1000);
  }
}

export function* fetchBicycleData(): any {
  try {
    const endpoint = `${process.env.REACT_APP_API_URL}/bicycle/`;
    const response = yield call(fetch, endpoint);
    const data = yield response.json();
    yield put({ type: RENDER_BICYCLE_DATA, bicycle: data });
  } catch (error) {
    yield put({ type: LOAD_BICYCLE_DATA_FAILED, error });
  }
}

export function* loadBicycleData() {
  yield takeEvery(LOAD_BICYCLE_DATA, fetchBicycleDataPeriodically);
}

export function* fetchBicycleTimeseriesData(action: {
  type: string;
  from: Date;
  to: Date;
}): any {
  try {
    const endpoint = `${
      process.env.REACT_APP_API_URL
    }/bicycle/timeseries?from=${action.from.toISOString()}&to=${action.to.toISOString()}`;
    const response = yield call(fetch, endpoint);
    const data = yield response.json();
    yield put({ type: RENDER_BICYCLE_DATA, bicycle: data });
  } catch (error) {
    yield put({ type: LOAD_BICYCLE_DATA_FAILED, error });
  }
}

export function* loadBicycleTimeseriesData() {
  yield takeEvery(LOAD_BICYCLE_TIMESERIES_DATA, fetchBicycleTimeseriesData);
}

// station data
export function* fetchBicycleStationDataPeriodically(action: any) {
  while (true) {
    yield call(fetchBicycleStationData, action);
    yield delay(INTERVAL * 1000);
  }
}

export function* fetchBicycleStationData(action: any): any {
  try {
    const endpoint = `${process.env.REACT_APP_API_URL}/bicycle/${action.stationId}`;
    const response = yield call(fetch, endpoint);
    const data = yield response.json();
    yield put({
      type: RENDER_BICYCLE_STATION_DATA,
      payload: {
        stationId: action.stationId,
        data: data.filter(
          (e: { date: string; counts: number; status: number }) =>
            e.counts != null
        ),
      },
    });
  } catch (error) {
    yield put({ type: LOAD_BICYCLE_DATA_FAILED, error });
  }
}

export function* loadBicycleStationData() {
  yield takeEvery(
    LOAD_BICYCLE_STATION_DATA,
    fetchBicycleStationDataPeriodically
  );
}
