import axios from 'axios';
import {BASE_API } from '../api/ApiConstants'

const initialState = {
  seasonsList: [],
  loading: false,
  error: null
}

const LOAD_SEASONS_START = "LOAD_SEASONS_START";
const LOAD_SEASONS_SUCCESS = "LOAD_SEASONS_SUCCESS";
const LOAD_SEASONS_ERROR = "LOAD_SEASONS_ERROR";

export const fetchSeasons = (driverId) => {
  return (dispatch) => {
    dispatch(loadSeasonsStart());
    axios.get(`${BASE_API}/f1/drivers/${driverId}/seasons.json`)
      .then(res => {
        dispatch(loadSeasonsSuccess(res.data.MRData.SeasonTable));
      })
      .catch(err => {
        dispatch(loadSeasonsError(err.message));
      });
  };
};
export const loadSeasonsStart = () => ({type: LOAD_SEASONS_START});
export const loadSeasonsSuccess = (seasonDriver) => ({
  type: LOAD_SEASONS_SUCCESS,
  payload: seasonDriver
});
export const loadSeasonsError = (errorMsg) => ({type: LOAD_SEASONS_ERROR, payload: errorMsg});

export const seasonsReducer = (state = initialState, action) => {
  switch(action.type) {
    case LOAD_SEASONS_START: return {
      ...state,
      loading: true,
      error: null
    }
    case LOAD_SEASONS_SUCCESS: 
      const checkOnClone = state.seasonsList.filter(d => d.driverId !== action.payload.driverId)
      const oldArray = checkOnClone.length > 0 ? [...checkOnClone] : []
      return {
        ...state,
        seasonsList: [...oldArray, action.payload],
        loading: false,
        error: null
      }
    case LOAD_SEASONS_ERROR: return {
      ...state,
      error: action.payload,
      loading: false
    }
    default: return state;
  }
}
