import {
  LOAD_OSEM_DATA_FAILED,
  RENDER_OSEM_DATA,
  RENDER_TEMPERATURE_24_DATA,
} from '../actions/opensensemap';

const initialState: ServiceState = {
  data: {
    live: {},
    temperature24: {},
    humidity24: {},
    pressure24: {},
  },
  metadata: {
    title: 'openSenseMap',
    updatedAt: undefined,
    online: false,
    error: undefined,
  },
};

export default function opensensemap(state = initialState, action: any) {
  switch (action.type) {
    case RENDER_OSEM_DATA:
      return {
        ...state,
        metadata: {
          ...state.metadata,
          updatedAt: new Date(),
          online: true,
        },
        data: {
          ...state.data,
          live: action.osem,
        },
      };
    case RENDER_TEMPERATURE_24_DATA:
      return {
        ...state,
        metadata: {
          ...state.metadata,
          updatedAt: new Date(),
          online: true,
        },
        data: {
          ...state.data,
          temperature24: action.data,
        },
      };
    case LOAD_OSEM_DATA_FAILED:
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
