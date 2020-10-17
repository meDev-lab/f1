import axios from 'axios';
import {BASE_API, LIMIT } from '../api/ApiConstants'

const initialState = {
  offset: 0,
  driverList: [],
  totalDrivers: 0,
  loading: false,
  error: null
}

const LOAD_DRIVERS_START = "LOAD_DRIVERS_START";
const LOAD_DRIVERS_SUCCESS = "LOAD_DRIVERS_SUCCESS";
const LOAD_DRIVERS_ERROR = "LOAD_DRIVERS_ERROR";

const ADD_TOTAL_DRIVERS = "ADD_TOTAL_DRIVERS";

export const fetchDrivers = () => {
  return (dispatch, getState) => {
    dispatch(loadDriversStart());
    axios.get(`${BASE_API}/f1/drivers.json?limit=${LIMIT}&offset=${getState().driverReducer.offset}`)
      .then(res => {
        dispatch(loadDriversSuccess(res.data.MRData.DriverTable.Drivers));
        dispatch(setTotalItems(res.data.MRData.total || 0));
      })
      .catch(err => {
        dispatch(loadDriversError(err.message));
      });
  };
};
export const loadDriversStart = () => ({type: LOAD_DRIVERS_START});
export const loadDriversSuccess = (arrDrivers) => ({type: LOAD_DRIVERS_SUCCESS, payload: arrDrivers});
export const loadDriversError = (errorMsg) => ({type: LOAD_DRIVERS_ERROR, payload: errorMsg});

export const setTotalItems = (total) => ({type: ADD_TOTAL_DRIVERS, payload: total});

export const driverReducer = (state = initialState, action) => {
  switch(action.type) {
    case LOAD_DRIVERS_START: return {
      ...state,
      loading: true,
      error: null
    }
    case LOAD_DRIVERS_SUCCESS: return {
      ...state,
      offset: parseInt(state.offset) + LIMIT,
      driverList: [...state.driverList || [], ...action.payload],
      loading: false,
      error: null
    }
    case LOAD_DRIVERS_ERROR: return {
      ...state,
      error: action.payload,
      loading: false
    }
    case ADD_TOTAL_DRIVERS: return {
      ...state,
      totalDrivers: action.payload
    }
    default: return state;
  }
}
