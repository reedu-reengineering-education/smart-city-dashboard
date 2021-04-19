import { call, delay, put, takeEvery } from 'redux-saga/effects';
import {
  LOAD_PARKHAUS_DATA,
  LOAD_PARKHAUS_DATA_FAILED,
  LOAD_PARKHAUS_TIMESERIES_DATA,
  RENDER_PARKHAUS_DATA,
  RENDER_PARKHAUS_TIMELINE_DATA,
} from '../actions/parkhaus';

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
