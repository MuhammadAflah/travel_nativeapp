import { configureStore } from "@reduxjs/toolkit";
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
import AsyncStorage from "@react-native-async-storage/async-storage"; // Use AsyncStorage
import UserSlice, { UserState } from "./userSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

// Define RootState with persisted user state
export interface RootState {
  user: UserState;
}

// Persist configuration using AsyncStorage instead of session storage
const persistConfig = {
  key: "root",
  storage: AsyncStorage, // Use AsyncStorage instead of session storage
};

const persistedUserReducer = persistReducer<UserState>(
  persistConfig,
  UserSlice
);

const customSerializableCheck = {
  ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
};

const store = configureStore({
  reducer: {
    user: persistedUserReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: customSerializableCheck,
    }),
});

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const persistor = persistStore(store);

export default store;
