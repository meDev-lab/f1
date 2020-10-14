import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {SafeAreaView, View, FlatList, TouchableOpacity ,Text, StyleSheet, Linking, ActivityIndicator} from 'react-native';

export const LoadMore = (props) => {
  const {isLoading, fetchData} = props;
  const arrDrivers = useSelector(state => state.driverReducer.driverList);
  const totalDrivers = useSelector(state => state.driverReducer.totalDrivers);
  const checkEndArray = parseInt(totalDrivers) > arrDrivers.length
  
  return(
    <>
      {checkEndArray && 
        <TouchableOpacity disabled={isLoading} onPress={fetchData} style={styles.footer}>
            {isLoading ? <ActivityIndicator color="#ffffff"/> : <Text style={styles.btn}>Load More</Text>}
        </TouchableOpacity>
      }
    </>
  )
}

const styles = StyleSheet.create({
  footer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007bff',
    textAlign: 'center',
    paddingVertical: 20
  },
  btn: {
    color: '#ffffff',
    textTransform: 'uppercase'
  }
});