import { LOAD_AASEE_DATA_FAILED, RENDER_AASEE_DATA } from '../actions/aasee';
import {
  LOAD_OSEM_DATA_FAILED,
  RENDER_OSEM_DATA,
} from '../actions/opensensemap';
import {
  LOAD_PARKHAUS_DATA_FAILED,
  RENDER_PARKHAUS_DATA,
} from '../actions/parkhaus';

interface AppData {
  aasee: AppDataObject;
  parkhaus: AppDataObject;
  opensensemap: AppDataObject;
}

interface AppDataObject {
  data: object;
  metadata: Metadata;
}

interface Metadata {
  title: string;
  updatedAt: Date | undefined;
  online: boolean;
  error: Error | undefined;
}

const initialState: AppData = {
  aasee: {
    data: {},
    metadata: {
      title: 'Wasserqualität Aasee',
      updatedAt: undefined,
      online: false,
      error: undefined,
    },
  },
  parkhaus: {
    data: {},
    metadata: {
      title: 'Parkhausbelegung',
      updatedAt: undefined,
      online: false,
      error: undefined,
    },
  },
  opensensemap: {
    data: {},
    metadata: {
      title: 'openSenseMap',
      updatedAt: undefined,
      online: false,
      error: undefined,
    },
  },
};

export default function dashboardApp(state = initialState, action: any) {
  switch (action.type) {
    case RENDER_PARKHAUS_DATA:
      return {
        ...state,
        parkhaus: {
          ...state.parkhaus,
          metadata: {
            ...state.parkhaus.metadata,
            updatedAt: new Date(),
            online: true,
          },
          data: action.parkhaus,
        },
      };
    case LOAD_PARKHAUS_DATA_FAILED:
      return {
        ...state,
        parkhaus: {
          ...state.parkhaus,
          metadata: {
            ...state.parkhaus.metadata,
            online: false,
            error: action.error,
          },
        },
      };
    case RENDER_AASEE_DATA:
      return {
        ...state,
        aasee: {
          ...state.aasee,
          metadata: {
            ...state.aasee.metadata,
            updatedAt: new Date(),
            online: true,
          },
          data: action.aasee,
        },
      };
    case LOAD_AASEE_DATA_FAILED:
      return {
        ...state,
        aasee: {
          ...state.aasee,
          metadata: {
            ...state.aasee.metadata,
            online: false,
            error: action.error,
          },
        },
      };
    case RENDER_OSEM_DATA:
      return {
        ...state,
        opensensemap: {
          ...state.opensensemap,
          metadata: {
            ...state.opensensemap.metadata,
            updatedAt: new Date(),
            online: true,
          },
          data: action.osem,
        },
      };
    case LOAD_OSEM_DATA_FAILED:
      return {
        ...state,
        opensensemap: {
          ...state.opensensemap,
          metadata: {
            ...state.opensensemap.metadata,
            online: false,
            error: action.error,
          },
        },
      };
    default:
      return state;
  }
}
