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
  LOAD_PARKHAUS_DATA,
  LOAD_PARKHAUS_DATA_FAILED,
  LOAD_PARKHAUS_TIMESERIES_DATA,
  RENDER_PARKHAUS_DATA,
  RENDER_PARKHAUS_TIMELINE_DATA,
} from '../actions/parkhaus';

// update interval in seconds
const INTERVAL = 60;

export function* fetchParkhausDataPeriodically() {
  while (true) {
    yield call(fetchParkhausData);
    yield delay(INTERVAL * 1000);
  }
}

export function* fetchParkhausData(): any {
  try {
    const endpoint = `${process.env.REACT_APP_API_URL}/parking`;
    const response: Response = yield call(fetch, endpoint);
    const data = yield response.json();
    yield put({ type: RENDER_PARKHAUS_DATA, parkhaus: data });
  } catch (error) {
    yield put({ type: LOAD_PARKHAUS_DATA_FAILED, error });
  }
}

export function* loadParkhausData() {
  yield takeEvery(LOAD_PARKHAUS_DATA, fetchParkhausDataPeriodically);
}

export function* fetchParkhausTimeseriesData(action: {
  type: string;
  from: Date;
  to: Date;
}): any {
  try {
    const endpoint = `${
      process.env.REACT_APP_API_URL
    }/parking/timeseries?from=${action.from.toISOString()}&to=${action.to.toISOString()}`;
    const response = yield call(fetch, endpoint);
    const data = yield response.json();
    yield put({
      type: RENDER_PARKHAUS_TIMELINE_DATA,
      parkhausTimeline: data,
    });
  } catch (error) {
    yield put({ type: LOAD_PARKHAUS_DATA_FAILED, error });
  }
}

export function* loadParkhausTimeseriesData() {
  yield takeEvery(LOAD_PARKHAUS_TIMESERIES_DATA, fetchParkhausTimeseriesData);
}
