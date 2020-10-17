import React from 'react';
import { fetchSeasons } from "../../redux/SeasonsReducer";
import {useRoute} from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import {
  SafeAreaView,
  View,
  FlatList,
  ToastAndroid,
  Text,
  StyleSheet,
  Linking, 
  ActivityIndicator
} from 'react-native';

export const Seasons = () => {
  const route = useRoute();
  const dispatch = useDispatch();

  const arrSeasons = useSelector(state => state.seasonsReducer.seasonsList);
  const isLoading = useSelector(state => state.seasonsReducer.loading);
  const isError = useSelector(state => state.seasonsReducer.error);

  React.useEffect(() => {
    dispatch(fetchSeasons(route.params.driverId || null))
  },[])
  
  if(isLoading) return <ActivityIndicator paddingVertical="10%" color="red"/>
  if(isError) return <Text style={styles.error}>{`${isError}`}</Text>
  return(
    <SafeAreaView style={styles.container}>
        <FlatList
          data={arrSeasons.filter(d => d.driverId === route.params.driverId).map(v => v.Seasons).flat()}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => {
            return (
              <View key={index} style={styles.wrap}>
                <Text style={styles.name}>{`season: ${item.season}`}</Text>
                <Text style={styles.link} onPress={() => Linking.openURL(`${item.url}`)}>Open in Wikipedia</Text>
              </View>
            );
          }}
        />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: "3%"
  },
  userData: {textAlign: 'center'},
  wrap: {
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "space-evenly",
    marginBottom: 10
},
  name: {
    fontSize: 23,
    color: 'grey'
  },
  link: {
    fontSize: 23,
    color: 'grey',
    textDecorationLine: 'underline'
  },
  error: {
    fontSize: 23,
    color: 'grey',
    textAlign: 'center',
    paddingVertical: '10%'
  }
});