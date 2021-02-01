import { all } from 'redux-saga/effects';
import { loadParkhausData } from './parkhaus';
import { loadAaseeData } from './aasee';
import { loadOsemData } from './opensensemap';
import { loadPedestrianData } from './passanten';
import { loadBicycleData, loadBicycleStationData } from './bicycle';

export default function* rootSaga() {
  yield all([
    loadAaseeData(),
    loadParkhausData(),
    loadOsemData(),
    loadPedestrianData(),
    loadBicycleData(),
    loadBicycleStationData(),
  ]);
}
