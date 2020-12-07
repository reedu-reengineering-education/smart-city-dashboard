export const LOAD_OSEM_DATA = 'LOAD_OSEM_DATA';
export const LOAD_OSEM_DATA_FAILED = 'LOAD_OSEM_DATA_FAILED';
export const RENDER_OSEM_DATA = 'RENDER_OSEM_DATA';

export function loadOsemData() {
  return {
    type: LOAD_OSEM_DATA,
  };
}
