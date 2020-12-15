import { UPDATE_MAP_VIEWPORT } from '../actions/map';

interface MapState {
  viewport: any;
  bbox: any;
}

const initialState: MapState = {
  viewport: {
    latitude: 51.9577,
    longitude: 7.6376,
    zoom: 12,
    maxZoom: 17,
  },
  bbox: [
    [7.486414, 51.857632],
    [7.763585, 52.081687],
  ],
};

export default function map(state = initialState, action: any) {
  switch (action.type) {
    case UPDATE_MAP_VIEWPORT:
      return {
        ...state,
        viewport: action.viewport,
      };
    default:
      return state;
  }
}
