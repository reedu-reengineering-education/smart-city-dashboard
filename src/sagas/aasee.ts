import { call, delay, put, takeEvery } from 'redux-saga/effects';
import {
  LOAD_AASEE_DATA,
  LOAD_AASEE_DATA_FAILED,
  RENDER_AASEE_DATA,
} from '../actions/aasee';

const INTERVAL = 60;

export function* fetchAaseeDataPeriodically() {
  while (true) {
    yield call(fetchAaseeData);
    yield delay(INTERVAL * 1000);
  }
}

export function* fetchAaseeData() {
  try {
    const endpoint =
      'https://datahub.digital/api/device/832/packets?auth=D3C9FBF4-C2F2-4AE1-9D5C-056B4119B1DD';
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
