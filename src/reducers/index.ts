import { RENDER_AASEE_DATA } from '../actions/aasee';
import { RENDER_OSEM_DATA } from '../actions/opensensemap';
import { RENDER_PARKHAUS_DATA } from '../actions/parkhaus';

const initialState = {
  aasee: {},
  parkhaus: {},
  osem: {},
};

export default function dashboardApp(state = initialState, action: any) {
  switch (action.type) {
    case RENDER_PARKHAUS_DATA:
      return {
        ...state,
        parkhaus: action.parkhaus,
      };
    case RENDER_AASEE_DATA:
      return {
        ...state,
        aasee: action.aasee,
      };
    case RENDER_OSEM_DATA:
      return {
        ...state,
        osem: action.osem,
      };
    default:
      return state;
  }
}
