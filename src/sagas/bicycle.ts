import { call, delay, put, takeEvery } from 'redux-saga/effects';
import {
  LOAD_BICYCLE_DATA,
  LOAD_BICYCLE_STATION_DATA,
  LOAD_BICYCLE_DATA_FAILED,
  RENDER_BICYCLE_DATA,
  RENDER_BICYCLE_STATION_DATA,
} from '../actions/bicycle';

const INTERVAL = 3600; // each hour

// static
export function* fetchBicycleDataPeriodically() {
  while (true) {
    yield call(fetchBicycleData);
    yield delay(INTERVAL * 1000);
  }
}

export function* fetchBicycleData() {
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

// station data
export function* fetchBicycleStationDataPeriodically(action: any) {
  while (true) {
    yield call(fetchBicycleStationData, action);
    yield delay(INTERVAL * 1000);
  }
}

export function* fetchBicycleStationData(action: any) {
  try {
    const endpoint = `${process.env.REACT_APP_API_URL}/bicycle/${action.stationId}`;
    const response = yield call(fetch, endpoint);
    const data = yield response.json();
    yield put({
      type: RENDER_BICYCLE_STATION_DATA,
      payload: { stationId: action.stationId, data },
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
