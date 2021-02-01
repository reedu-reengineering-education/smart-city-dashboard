import {
  LOAD_BICYCLE_DATA_FAILED,
  RENDER_BICYCLE_DATA,
  RENDER_BICYCLE_STATION_DATA,
} from '../actions/bicycle';

const initialState: ServiceState = {
  data: {},
  metadata: {
    title: 'Fahrräder Münster',
    updatedAt: undefined,
    online: false,
    error: undefined,
  },
};

export default function bicycle(state = initialState, action: any) {
  switch (action.type) {
    case RENDER_BICYCLE_DATA:
      return {
        ...state,
        metadata: {
          ...state.metadata,
          updatedAt: new Date(),
          online: true,
        },
        data: action.bicycle,
      };
    case RENDER_BICYCLE_STATION_DATA:
      const stationId = action.payload.stationId;

      const stationToUpdate = [
        {
          ...state.data.find((station: any) => station.id === stationId),
          data: action.payload.data,
        },
      ];

      return {
        ...state,
        metadata: {
          ...state.metadata,
          updatedAt: new Date(),
          online: true,
        },
        data: [
          ...state.data.filter((station: any) => station.id !== stationId),
          ...stationToUpdate,
        ],
      };
    case LOAD_BICYCLE_DATA_FAILED:
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
