import { createStore } from "redux";
import { driverReducer } from "./DriverReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import AsyncStorage from '@react-native-community/async-storage';
import { persistCombineReducers, persistStore } from "redux-persist";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2, // see "Merge Process" section for details.
  blacklist: ["network"]
};

const rootReducer = persistCombineReducers(persistConfig, {
  driverReducer
});

const composeEnhancers = composeWithDevTools({
  // Specify here name, actionsBlacklist, actionsCreators and other options
});

export const store = createStore(rootReducer, composeEnhancers());
export const persistor = persistStore(store);
