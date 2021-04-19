import {
  LOAD_PARKHAUS_DATA_FAILED,
  RENDER_PARKHAUS_DATA,
  RENDER_PARKHAUS_TIMELINE_DATA,
} from '../actions/parkhaus';

export interface IParkingState extends ServiceState {
  data: GeoJSON.FeatureCollection;
  dataTimeline: {
    data: any[];
    metadata: any;
  };
}

const initialState: IParkingState = {
  data: {
    type: 'FeatureCollection',
    features: [],
  },
  dataTimeline: {
    data: [],
    metadata: undefined,
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
    case RENDER_PARKHAUS_TIMELINE_DATA:
      return {
        ...state,
        metadata: {
          ...state.metadata,
          updatedAt: new Date(),
          online: true,
        },
        dataTimeline: action.parkhausTimeline,
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
