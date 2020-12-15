export const UPDATE_MAP_VIEWPORT = 'UPDATE_MAP_VIEWPORT';

export function updateMapViewport(viewport: any) {
  return {
    type: UPDATE_MAP_VIEWPORT,
    viewport,
  };
}
