import React from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import { loadDrivers, setTotalItems } from "../../redux/DriverReducer";
import {SafeAreaView, View, FlatList, TouchableOpacity ,Text, StyleSheet, Linking, ActivityIndicator} from 'react-native';

export const DetailInfo = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const driver = route.params.driver;

  React.useEffect(() => {
    navigation.setOptions({
      headerTitle: `${driver.givenName} ${driver.familyName}`
    });
  },[])

  return(
    <SafeAreaView style={styles.container}>
      <View key={driver.driverId} style={styles.userData}>
        <Text style={styles.name}>{`Name: ${driver.givenName} ${driver.familyName}`}</Text>
        <Text style={styles.name}>{`Date of birth: ${driver.dateOfBirth}`}</Text>
        <Text style={styles.name}>{`Nationality: ${driver.nationality}`}</Text>
        <Text style={styles.link} onPress={() => Linking.openURL(`${driver.url}`)}>Open in Wikipedia</Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  userData: {textAlign: 'center'},
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