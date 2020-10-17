import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import AsyncStorage from '@react-native-community/async-storage';
import { persistCombineReducers, persistStore } from "redux-persist";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

import { driverReducer } from "./DriverReducer";
import { seasonsReducer } from "./SeasonsReducer";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2, // see "Merge Process" section for details.
  blacklist: ["network"]
};

const rootReducer = persistCombineReducers(persistConfig, {
  driverReducer,
  seasonsReducer
});

const composeEnhancers = composeWithDevTools({
  // Specify here name, actionsBlacklist, actionsCreators and other options
});

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
export const persistor = persistStore(store);
