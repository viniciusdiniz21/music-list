import { configureStore } from "@reduxjs/toolkit";
import favoritos from "./favoritos";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import { getDefaultMiddleware } from "@reduxjs/toolkit";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});

const reducer = combineReducers({
  favoritos: favoritos,
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: customizedMiddleware,
});

const persistor = persistStore(store);

export { store, persistor };
