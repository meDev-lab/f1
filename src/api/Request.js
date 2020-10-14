import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import {BASE_API, LIMIT } from './ApiConstants'
import { store } from "../redux";

export const fetchDrivers = () => {
  const offset = store.getState().driverReducer.offset
  // return fetch(`${BASE_API}/f1/drivers.json?limit=${LIMIT}&offset=${offset}`)
  return axios.get(`${BASE_API}/f1/drivers.json?limit=${LIMIT}&offset=${offset}`)

  // .then((response) => {
  //   if(response.status === 200){
  //     console.log(response)
  //     store.dispatch(setTotalItems(response.data.MRData.total || 0))
  //     store.dispatch(loadDrivers(response.data.MRData.DriverTable.Drivers))
  //   }
  // })
  // .catch((error) => {
  //   console.log(error);
  // })
}

export const fetchDriverSeasons= (driverId) => {
  console.log(driverId,"driverId")
  return !!driverId && axios.get(`${BASE_API}/f1/drivers/${driverId}/seasons.json`)
  // .then((response) => {
  //   if(response.status === 200){
  //     console.log(response)
  //     store.dispatch(setTotalItems(response.data.MRData.total || 0))
  //     store.dispatch(loadDrivers(response.data.MRData.DriverTable.Drivers))
  //   }
  // })
  // .catch((error) => {
  //   console.log(error);
  // })
}