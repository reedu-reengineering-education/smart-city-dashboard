import { all } from 'redux-saga/effects';
import { loadParkhausData } from './parkhaus';
import { loadAaseeData } from './aasee';
import { loadOsemData, loadOsemTimeseriesData } from './opensensemap';
import { loadPedestrianData, loadPedestrianTimeseriesData } from './passanten';
import {
  loadBicycleData,
  loadBicycleStationData,
  loadBicycleTimeseriesData,
} from './bicycle';

export default function* rootSaga() {
  yield all([
    loadAaseeData(),
    loadParkhausData(),
    loadOsemData(),
    loadOsemTimeseriesData(),
    loadPedestrianData(),
    loadPedestrianTimeseriesData(),
    loadBicycleData(),
    loadBicycleTimeseriesData(),
    loadBicycleStationData(),
  ]);
}
