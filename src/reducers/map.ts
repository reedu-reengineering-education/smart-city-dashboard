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
    [51.857632, 7.486414],
    [52.081687, 7.763585],
  ],
  features: {
    opensensemap: false,
    aasee: false,
    parking: false,
    pedestrians: false,
    bicycles: false,
  },
};

/**
 * Reducer to update the map state
 */
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
