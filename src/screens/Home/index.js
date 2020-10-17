import React from 'react';
import {useNavigation} from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDrivers } from "../../redux/DriverReducer";
import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';

export const HomeView = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch()

  const arrDrivers = useSelector(state => state.driverReducer.driverList);
  const totalDrivers = useSelector(state => state.driverReducer.totalDrivers);
  const isLoading = useSelector(state => state.driverReducer.loading);
  const isError = useSelector(state => state.driverReducer.error);

  const checkEndArray = parseInt(totalDrivers) > arrDrivers.length

  React.useEffect(() => {
    // small crutch
    navigation.setOptions({
      headerTransparent: true,
      headerTitle: ''
    });
    dispatch(fetchDrivers())
  },[])

  return(
    <SafeAreaView style={styles.container}>
      <FlatList
        data={arrDrivers}
        onEndReachedThreshold={2}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => {
          return (
            <View style={styles.item}>
              <View style={styles.row}>
                <TouchableOpacity
                  style={styles.wrap}
                  onPress={() => navigation.navigate('DetailInfo', {driver: item})}
                >
                  <Text style={styles.driverName}>{`${item.givenName} ${item.familyName}`}</Text>
                </TouchableOpacity>
                <View
                  style={{
                    borderBottomColor: 'black',
                    borderBottomWidth: StyleSheet.hairlineWidth,
                    width: 100
                  }}
                />
                <TouchableOpacity
                  style={styles.wrap}
                  onPress={() => navigation.navigate('Seasons', {driverId: item.driverId})}
                >
                  <Text style={styles.season}>Seasons</Text>
                </TouchableOpacity>
               </View>
            </View>
          );
        }}
        ListFooterComponent={() => {
          return <>
            {checkEndArray && 
              <TouchableOpacity
                disabled={isLoading}
                onPress={() => dispatch(fetchDrivers())}
                style={[styles.footer,{backgroundColor: !!isError ? '#ff0008' : '#007bff'}]}
              >
                {isLoading
                  ? <ActivityIndicator color="#ffffff"/> 
                  : <Text style={styles.btn}>{`${!!isError ? isError : 'Load More'}`}</Text>
                }
            </TouchableOpacity>
            }
          </>
        }}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#E4E9EE',
    marginVertical: 5,
    marginHorizontal: 16,
  },
  driverName: {
    color: '#444D56',
    textAlign: 'center'
  },
  season: {
    color: '#444D56',
    textAlign: 'center'
  },
  row: {
    alignItems: 'center',
    justifyContent: "space-evenly"
  },
  wrap: {
    paddingVertical: '1%',
    width: '100%'
  },
  loadMore: {
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'red',
    paddingVertical: 20
  },
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