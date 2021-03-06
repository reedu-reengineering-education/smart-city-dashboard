import { all } from 'redux-saga/effects';
import { loadParkhausData, loadParkhausTimeseriesData } from './parkhaus';
import { loadAaseeData, loadAaseeTimeseriesData } from './aasee';
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
    loadAaseeTimeseriesData(),
    loadParkhausData(),
    loadParkhausTimeseriesData(),
    loadOsemData(),
    loadOsemTimeseriesData(),
    loadPedestrianData(),
    loadPedestrianTimeseriesData(),
    loadBicycleData(),
    loadBicycleTimeseriesData(),
    loadBicycleStationData(),
  ]);
}
