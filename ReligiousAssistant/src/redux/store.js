import { configureStore } from '@reduxjs/toolkit'

//import all reducers from slices

import authReducer from './slices/authSlice'
import bottomNavReducer from './slices/bottomNavSlice';

const store = configureStore({
  reducer: {
    user:authReducer,  
    bottomNav:bottomNavReducer
  },
})

export default store;
