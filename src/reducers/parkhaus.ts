import {
  LOAD_PARKHAUS_DATA_FAILED,
  RENDER_PARKHAUS_DATA,
} from '../actions/parkhaus';

export interface IParkingState extends ServiceState {
  data: GeoJSON.FeatureCollection;
}

const initialState: IParkingState = {
  data: {
    type: 'FeatureCollection',
    features: [],
  },
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
      return {
        ...state,
        metadata: {
          ...state.metadata,
          updatedAt: new Date(),
          online: true,
        },
        data: action.parkhaus,
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
