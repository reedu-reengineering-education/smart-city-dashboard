import { all } from 'redux-saga/effects';
import { loadParkhausData } from './parkhaus';
import { loadAaseeData } from './aasee';
import { loadOsemData } from './opensensemap';

export default function* rootSaga() {
  yield all([loadAaseeData(), loadParkhausData(), loadOsemData()]);
}
