import {
  LOAD_PARKHAUS_DATA_FAILED,
  RENDER_PARKHAUS_DATA,
} from '../actions/parkhaus';
// @ts-ignore
import { toWgs84 } from 'reproject';
var epsg = require('epsg');

const initialState: ServiceState = {
  data: {},
  metadata: {
    title: 'Parkhausbelegung',
    updatedAt: undefined,
    online: false,
    error: undefined,
  },
};

export default function parkhaus(state = initialState, action: any) {
  switch (action.type) {
    case RENDER_PARKHAUS_DATA:
      // convert vom gauß krüger zone 3 to wgs84
      const data = toWgs84(
        action.parkhaus,
        '+proj=tmerc +lat_0=0 +lon_0=9 +k=1 +x_0=3500000 +y_0=0 +ellps=bessel +towgs84=598.1,73.7,418.2,0.202,0.045,-2.455,6.7 +units=m +no_defs',
        epsg
      );

      return {
        ...state,
        metadata: {
          ...state.metadata,
          updatedAt: new Date(),
          online: true,
        },
        data,
      };
    case LOAD_PARKHAUS_DATA_FAILED:
      return {
        ...state,
        metadata: {
          ...state.metadata,
          online: false,
          error: action.error,
        },
      };

    default:
      return state;
  }
}
