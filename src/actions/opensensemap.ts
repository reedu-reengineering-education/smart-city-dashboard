export const LOAD_OSEM_DATA = 'LOAD_OSEM_DATA';
export const LOAD_OSEM_TIMESERIES_DATA = 'LOAD_OSEM_TIMESERIES_DATA';
export const LOAD_OSEM_DATA_FAILED = 'LOAD_OSEM_DATA_FAILED';
export const RENDER_OSEM_DATA = 'RENDER_OSEM_DATA';

export const RENDER_TEMPERATURE_24_DATA = 'RENDER_TEMPERATURE_24_DATA';
export const RENDER_HUMIDITY_24_DATA = 'RENDER_HUMIDITY_24_DATA';

export function loadOsemData() {
  return {
    type: LOAD_OSEM_DATA,
  };
}

export function loadOsemTimeseriesData(from: Date, to: Date) {
  return {
    type: LOAD_OSEM_TIMESERIES_DATA,
    from,
    to,
  };
}
