import { configureStore } from '@reduxjs/toolkit'

//import all reducers from slices

import authReducer from './slices/authSlice'

const store = configureStore({
  reducer: {
    user:authReducer,  
  },
})

export default store;
