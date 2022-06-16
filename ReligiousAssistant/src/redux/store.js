import { configureStore } from '@reduxjs/toolkit'

//import all reducers from slices

import authReducer from './slices/auth_slices/authSlice'
import bottomNavReducer from './slices/muslim_module_slices/bottomNavSlice';

const store = configureStore({
  reducer: {
    user:authReducer,  
    bottomNav:bottomNavReducer
  },
})

export default store;
