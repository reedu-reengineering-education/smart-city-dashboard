import {
  LOAD_OSEM_DATA_FAILED,
  RENDER_OSEM_DATA,
} from '../actions/opensensemap';

const initialState: ServiceState = {
  data: {},
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
        data: action.osem,
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
