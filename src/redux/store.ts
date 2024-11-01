import { combineReducers, configureStore } from "@reduxjs/toolkit";
import orderReducer from "./order/orderSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import AsyncStorage from '@react-native-async-storage/async-storage';
const persistConfig = {
  key: "root",
  version: 1,
  storage: AsyncStorage,
  blacklist: ["account"],
};
const rootReducer = combineReducers({
  order: orderReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

let persistor = persistStore(store);

export { store, persistor };
