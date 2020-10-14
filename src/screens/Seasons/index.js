import React from 'react';
import {fetchDriverSeasons} from '../../api/Request';
import {useRoute} from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import {SafeAreaView, View, ScrollView, Text, StyleSheet, Linking, ActivityIndicator} from 'react-native';

export const Seasons = () => {
  const route = useRoute();
  const dispatch = useDispatch()
  const [isLoading, setLoading] = React.useState(false)
  const [seasons, setSeasons] = React.useState([])

  React.useEffect(() => {
    fetchData()
  },[])

  const fetchData = () => {
    setLoading(true)
    fetchDriverSeasons(route.params.driverId || null)
    .then((response) => {
      if(response.status === 200){
        console.log(response.data.MRData.SeasonTable.Seasons)
        setSeasons(response.data.MRData.SeasonTable.Seasons)
        setLoading(false);
      }
    })
    .catch((error) => {
      console.log(error);
      setSeasons([])
      setLoading(false);
    })
  }

  return(
  <SafeAreaView style={styles.container}>
    {isLoading ? <ActivityIndicator color="red"/> :
      <ScrollView contentContainerStyle={{display: 'flex'}}>
        {seasons.map((data, index) => (
          <View key={index} style={styles.wrap}>
            <Text style={styles.name}>{`season: ${data.season}`}</Text>
            <Text style={styles.link} onPress={() => Linking.openURL(`${data.url}`)}>Open in Wikipedia</Text>
          </View>
        ))}
      </ScrollView>
    }
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
});