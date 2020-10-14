import React from 'react';
import {fetchDrivers} from '../../api/Request';
import {useNavigation} from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { loadDrivers, setTotalItems } from "../../redux/DriverReducer";
import {SafeAreaView, View, FlatList, TouchableOpacity ,Text, StyleSheet, Linking, ActivityIndicator} from 'react-native';
import {LoadMore} from '../../components/loadMore';

export const HomeView = () => {
  const navigation = useNavigation();
  // small crutch
  navigation.setOptions({
    headerTransparent: true,
    headerTitle: ''
  });
  const dispatch = useDispatch()
  const arrDrivers = useSelector(state => state.driverReducer.driverList);
  const [isLoading, setLoading] = React.useState(false)

  React.useEffect(() => {
    fetchData()
  },[])

  const fetchData = () => {
    setLoading(true)
    fetchDrivers()
    .then((response) => {
      if(response.status === 200){
        console.log(response)
        dispatch(setTotalItems(response.data.MRData.total || 0));
        dispatch(loadDrivers(response.data.MRData.DriverTable.Drivers));
        setLoading(false);
      }
    })
    .catch((error) => {
      console.log(error);
      setLoading(false);
    })
  }

  return(
    <SafeAreaView style={styles.container}>
      <FlatList
        data={arrDrivers}     
        onEndReachedThreshold={5}
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
          return <LoadMore isLoading={isLoading} fetchData={fetchData} />
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
    backgroundColor: '#eaeaea',
    textAlign: 'center',
    paddingVertical: 20
  }
});