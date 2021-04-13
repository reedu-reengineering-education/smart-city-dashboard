import { call, delay, put, takeEvery } from 'redux-saga/effects';
import {
  LOAD_AASEE_DATA,
  LOAD_AASEE_DATA_FAILED,
  LOAD_AASEE_TIMESERIES_DATA,
  RENDER_AASEE_DATA,
} from '../actions/aasee';

const INTERVAL = 60;

export function* fetchAaseeDataPeriodically() {
  while (true) {
    yield call(fetchAaseeData);
    yield delay(INTERVAL * 1000);
  }
}

export function* fetchAaseeData(): any {
  try {
    const endpoint = `${process.env.REACT_APP_API_URL}/aasee`;
    const response = yield call(fetch, endpoint);
    const data = yield response.json();
    yield put({ type: RENDER_AASEE_DATA, aasee: data });
  } catch (error) {
    yield put({ type: LOAD_AASEE_DATA_FAILED, error });
  }
}

export function* loadAaseeData() {
  yield takeEvery(LOAD_AASEE_DATA, fetchAaseeDataPeriodically);
}

export function* fetchAaseeTimeseriesData(action: {
  type: string;
  from: Date;
}): any {
  try {
    const endpoint = `${
      process.env.REACT_APP_API_URL
    }/aasee/timeseries?from=${action.from.toISOString()}`;
    const response = yield call(fetch, endpoint);
    const data = yield response.json();
    yield put({ type: RENDER_AASEE_DATA, aasee: data });
  } catch (error) {
    yield put({ type: LOAD_AASEE_DATA_FAILED, error });
  }
}

export function* loadAaseeTimeseriesData() {
  yield takeEvery(LOAD_AASEE_TIMESERIES_DATA, fetchAaseeTimeseriesData);
}
