export const LOAD_BICYCLE_DATA = 'LOAD_BICYCLE_DATA';
export const LOAD_BICYCLE_TIMESERIES_DATA = 'LOAD_BICYCLE_TIMESERIES_DATA';
export const LOAD_BICYCLE_STATION_DATA = 'LOAD_BICYCLE_STATION_DATA';
export const LOAD_BICYCLE_DATA_FAILED = 'LOAD_BICYCLE_DATA_FAILED';
export const LOAD_BICYCLE_STATION_DATA_FAILED = 'LOAD_BICYCLE_DATA_FAILED';
export const RENDER_BICYCLE_DATA = 'RENDER_BICYCLE_DATA';
export const RENDER_BICYCLE_STATION_DATA = 'RENDER_BICYCLE_STATION_DATA';

export function loadBicycleData() {
  return {
    type: LOAD_BICYCLE_DATA,
  };
}

export function loadBicycleTimeseriesData(from: Date, to: Date) {
  return {
    type: LOAD_BICYCLE_TIMESERIES_DATA,
    from,
    to,
  };
}

export function loadBicycleStationData(stationId: number) {
  return {
    type: LOAD_BICYCLE_STATION_DATA,
    stationId,
  };
}
