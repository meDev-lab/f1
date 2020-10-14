import {LIMIT} from '../api/ApiConstants'

const initialState = {
  offset: 0,
  driverList: [],
  totalDrivers: 0
}

const LOAD_DRIVERS = "LOAD_DRIVERS";
const ADD_TOTAL_DRIVERS = "ADD_TOTAL_DRIVERS";

export const setTotalItems = (total) => ({type: ADD_TOTAL_DRIVERS, payload: total});
export const loadDrivers = (arrDrivers) => ({type: LOAD_DRIVERS, payload: arrDrivers});

export const driverReducer = (state = initialState, action) => {
  switch(action.type) {
    case LOAD_DRIVERS: return {
      ...state,
      driverList: [...state.driverList || [], ...action.payload],
      offset: parseInt(state.offset) + LIMIT
    }
    case ADD_TOTAL_DRIVERS: return {
      ...state,
      totalDrivers: action.payload
    }
    default: return state;
  }
}
