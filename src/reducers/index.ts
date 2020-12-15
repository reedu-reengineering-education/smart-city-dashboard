import { combineReducers } from 'redux';
import aasee from './aasee';
import map from './map';
import opensensemap from './opensensemap';
import parkhaus from './parkhaus';

export default combineReducers({
  aasee,
  map,
  opensensemap,
  parkhaus,
});
