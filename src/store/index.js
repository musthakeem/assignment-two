import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

import {rootReducer} from '../reducers'

const persistConfig = {
    key: 'root',
    storage,
  }

  const persistedReducer = persistReducer(persistConfig, rootReducer)
  
  const StoreConfig = () => {
    let store = configureStore({
        reducer: persistedReducer,
        devTools: true,
        middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false,
        })
    })
    let persistor = persistStore(store)
    return { store, persistor }
  }

  export default StoreConfig;