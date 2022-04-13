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

import {
  LOAD_OSEM_DATA_FAILED,
  RENDER_OSEM_DATA,
  RENDER_TEMPERATURE_24_DATA,
  RENDER_HUMIDITY_24_DATA,
} from '../actions/opensensemap';

const initialState: ServiceState = {
  data: {
    live: {},
    temperature24: {},
    humidity24: {},
    pressure24: {},
  },
  metadata: {
    title: 'openSenseMap',
    updatedAt: undefined,
    online: false,
    error: undefined,
  },
};

export default function opensensemap(state = initialState, action: any) {
  switch (action.type) {
    case RENDER_OSEM_DATA:
      return {
        ...state,
        metadata: {
          ...state.metadata,
          updatedAt: new Date(),
          online: true,
        },
        data: {
          ...state.data,
          live: action.osem,
        },
      };
    case RENDER_TEMPERATURE_24_DATA:
      return {
        ...state,
        metadata: {
          ...state.metadata,
          updatedAt: new Date(),
          online: true,
        },
        data: {
          ...state.data,
          temperature24: action.data,
        },
      };
    case RENDER_HUMIDITY_24_DATA:
      return {
        ...state,
        metadata: {
          ...state.metadata,
          updatedAt: new Date(),
          online: true,
        },
        data: {
          ...state.data,
          humidity24: action.data,
        },
      };
    case LOAD_OSEM_DATA_FAILED:
      return {
        ...state,
        metadata: {
          ...state.metadata,
          online: false,
          error: action.error,
        },
      };
    default:
      return state;
  }
}
