/**
 * Smart City Münster Dashboard
 * Copyright (C) 2022 Reedu GmbH & Co. KG
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

export const LOAD_PEDESTRIAN_DATA = 'LOAD_PEDESTRIAN_DATA';
export const LOAD_PEDESTRIAN_TIMESERIES_DATA =
  'LOAD_PEDESTRIAN_TIMESERIES_DATA';
export const LOAD_PEDESTRIAN_DATA_FAILED = 'LOAD_PEDESTRIAN_DATA_FAILED';
export const RENDER_PEDESTRIAN_DATA = 'RENDER_PEDESTRIAN_DATA';

export function loadPedestrianData() {
  return {
    type: LOAD_PEDESTRIAN_DATA,
  };
}

export function loadPedestrianTimeseriesData(from: Date, to: Date) {
  return {
    type: LOAD_PEDESTRIAN_TIMESERIES_DATA,
    from,
    to,
  };
}
