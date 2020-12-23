import { UPDATE_MAP_VIEWPORT, UPDATE_FEATURES_VISIBLE } from '../actions/map';

interface MapState {
  viewport: any;
  bbox: any;
  features: {
    opensensemap: boolean;
    aasee: boolean;
    parking: boolean;
    pedestrians: boolean;
    bicycles: boolean;
  };
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
  features: {
    opensensemap: false,
    aasee: false,
    parking: false,
    pedestrians: false,
    bicycles: false,
  },
};

export default function map(state = initialState, action: any) {
  switch (action.type) {
    case UPDATE_MAP_VIEWPORT:
      return {
        ...state,
        viewport: action.viewport,
      };
    case UPDATE_FEATURES_VISIBLE:
      return {
        ...state,
        features: action.features,
      };
    default:
      return state;
  }
}
