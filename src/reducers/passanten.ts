import {
  LOAD_PEDESTRIAN_DATA_FAILED,
  RENDER_PEDESTRIAN_DATA,
} from '../actions/passanten';

const initialState: ServiceState = {
  data: {},
  metadata: {
    title: 'Passanten',
    updatedAt: undefined,
    online: false,
    error: undefined,
  },
};

export default function pedestrian(state = initialState, action: any) {
  switch (action.type) {
    case RENDER_PEDESTRIAN_DATA:
      return {
        ...state,
        metadata: {
          ...state.metadata,
          updatedAt: new Date(),
          online: true,
        },
        data: action.pedestrian,
      };
    case LOAD_PEDESTRIAN_DATA_FAILED:
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
