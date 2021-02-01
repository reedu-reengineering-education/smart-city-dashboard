import { combineReducers } from 'redux';
import aasee from './aasee';
import map from './map';
import opensensemap from './opensensemap';
import parkhaus from './parkhaus';
import passanten from './passanten';
import bicycle from './bicycle';

export default combineReducers({
  aasee,
  map,
  opensensemap,
  parkhaus,
  passanten,
  bicycle,
});
