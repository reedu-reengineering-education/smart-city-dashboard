export const LOAD_AASEE_DATA = 'LOAD_AASEE_DATA';
export const LOAD_AASEE_DATA_FAILED = 'LOAD_AASEE_DATA_FAILED';
export const RENDER_AASEE_DATA = 'RENDER_AASEE_DATA';

export function loadAaseeData() {
  return {
    type: LOAD_AASEE_DATA,
  };
}
