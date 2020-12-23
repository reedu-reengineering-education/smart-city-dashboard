export const UPDATE_MAP_VIEWPORT = 'UPDATE_MAP_VIEWPORT';
export const UPDATE_FEATURES_VISIBLE = 'UPDATE_FEATURES_VISIBLE';

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
