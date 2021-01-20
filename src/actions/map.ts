export const UPDATE_MAP_VIEWPORT = 'UPDATE_MAP_VIEWPORT';
export const UPDATE_FEATURES_VISIBLE = 'UPDATE_FEATURES_VISIBLE';
export const SET_ACTIVE_POPUP = 'SET_ACTIVE_POPUP';

export function updateMapViewport(viewport: any) {
  return {
    type: UPDATE_MAP_VIEWPORT,
    viewport,
  };
}

export function updateFeaturesVisible(features: any) {
  return {
    type: UPDATE_FEATURES_VISIBLE,
    features,
  };
}

export function setActivePopup(popup: JSX.Element | undefined) {
  return {
    type: SET_ACTIVE_POPUP,
    popup,
  };
}
