import { call, delay, put, takeEvery } from 'redux-saga/effects';
import {
  LOAD_OSEM_DATA,
  LOAD_OSEM_DATA_FAILED,
  RENDER_OSEM_DATA,
  RENDER_TEMPERATURE_24_DATA,
  RENDER_HUMIDITY_24_DATA,
} from '../actions/opensensemap';

const INTERVAL = 60;

export function* fetchOsemDataPeriodically() {
  while (true) {
    yield call(fetchOsemData);
    yield delay(INTERVAL * 1000);
  }
}

export function* fetchOsemData() {
  try {
    const endpoint =
      'https://api.opensensemap.org/boxes/5f7ddc9f692773001c7da31c';
    const response = yield call(fetch, endpoint);
    const data = yield response.json();
    yield put({ type: RENDER_OSEM_DATA, osem: data });
  } catch (error) {
    yield put({ type: LOAD_OSEM_DATA_FAILED, error });
  }

  try {
    const endpoint = `${process.env.REACT_APP_API_URL}/opensensemapTemperature24`;
    const response = yield call(fetch, endpoint);
    const data = yield response.json();
    yield put({ type: RENDER_TEMPERATURE_24_DATA, data: data });
  } catch (error) {
    yield put({ type: LOAD_OSEM_DATA_FAILED, error });
  }

  try {
    const endpoint = `${process.env.REACT_APP_API_URL}/opensensemapHumidity24`;
    const response = yield call(fetch, endpoint);
    const data = yield response.json();
    yield put({ type: RENDER_HUMIDITY_24_DATA, data: data });
  } catch (error) {
    yield put({ type: LOAD_OSEM_DATA_FAILED, error });
  }
}

export function* loadOsemData() {
  yield takeEvery(LOAD_OSEM_DATA, fetchOsemDataPeriodically);
}
