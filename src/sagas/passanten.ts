import { call, delay, put, takeEvery } from 'redux-saga/effects';
import {
  LOAD_PEDESTRIAN_DATA,
  LOAD_PEDESTRIAN_DATA_FAILED,
  RENDER_PEDESTRIAN_DATA,
} from '../actions/passanten';

const INTERVAL = 600; // 10 minutes

export function* fetchPedestrianDataPeriodically() {
  while (true) {
    yield call(fetchPedestrianData);
    yield delay(INTERVAL * 1000);
  }
}

export function* fetchPedestrianData() {
  try {
    const endpoint = `${process.env.REACT_APP_API_URL}/pedestrian`;
    const response = yield call(fetch, endpoint);
    const data = yield response.json();
    yield put({ type: RENDER_PEDESTRIAN_DATA, pedestrian: data });
  } catch (error) {
    yield put({ type: LOAD_PEDESTRIAN_DATA_FAILED, error });
  }
}

export function* loadPedestrianData() {
  yield takeEvery(LOAD_PEDESTRIAN_DATA, fetchPedestrianDataPeriodically);
}
