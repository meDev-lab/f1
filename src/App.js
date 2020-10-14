import React from 'react';
import { Provider } from 'react-redux';
import {store, persistor} from './redux';
import {HomeView} from './screens/Home';
import {DetailInfo} from './screens/DetailInfo';
import {Seasons} from './screens/Seasons';
import { ActivityIndicator } from "react-native";
import { PersistGate } from "redux-persist/es/integration/react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export const App = () => {
  return(
    <Provider store={store}>
      <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator /*screenOptions={{headerShown: false}}*/>
            <Stack.Screen name="Home" component={HomeView} />
            <Stack.Screen name="DetailInfo" component={DetailInfo} />
            <Stack.Screen name="Seasons" component={Seasons} />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  )
}
