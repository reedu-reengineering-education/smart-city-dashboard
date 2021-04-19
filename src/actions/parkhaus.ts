export const LOAD_PARKHAUS_DATA = 'LOAD_PARKHAUS_DATA';
export const LOAD_PARKHAUS_TIMESERIES_DATA = 'LOAD_PARKHAUS_TIMESERIES_DATA';
export const LOAD_PARKHAUS_DATA_FAILED = 'LOAD_PARKHAUS_DATA_FAILED';
export const RENDER_PARKHAUS_DATA = 'RENDER_PARKHAUS_DATA';
export const RENDER_PARKHAUS_TIMELINE_DATA = 'RENDER_PARKHAUS_TIMELINE_DATA';

export function loadParkhausData() {
  return {
    type: LOAD_PARKHAUS_DATA,
  };
}

export function loadParkhausTimeseriesData(from: Date, to: Date) {
  return {
    type: LOAD_PARKHAUS_TIMESERIES_DATA,
    from,
    to,
  };
}
