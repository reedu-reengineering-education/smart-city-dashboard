import { LOAD_AASEE_DATA_FAILED, RENDER_AASEE_DATA } from '../actions/aasee';

const initialState: ServiceState = {
  data: {},
  metadata: {
    title: 'Wasserqualität Aasee',
    updatedAt: undefined,
    online: false,
    error: undefined,
  },
};

export default function aasee(state = initialState, action: any) {
  switch (action.type) {
    case RENDER_AASEE_DATA:
      return {
        ...state,
        metadata: {
          ...state.metadata,
          updatedAt: new Date(),
          online: true,
        },
        data: action.aasee,
      };
    case LOAD_AASEE_DATA_FAILED:
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
