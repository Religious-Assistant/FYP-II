import { configureStore } from '@reduxjs/toolkit'

//import all reducers from slices

import authReducer from './slices/auth_slices/authSlice'
import bottomNavReducer from './slices/muslim_module_slices/bottomNavSlice';
import mosqueReducer from './slices/muslim_module_slices/mosqueSlice'
import announcementReducer from './slices/muslim_module_slices/announcementSlice'
import tasbihReducer from './slices/muslim_module_slices/tasbihSlice'
const store = configureStore({
  reducer: {
    user:authReducer,  
    mosque:mosqueReducer,
    bottomNav:bottomNavReducer,
    announcement: announcementReducer,
    tasbih: tasbihReducer
  },
})

export default store;
