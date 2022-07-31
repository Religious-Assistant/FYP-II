import { configureStore } from '@reduxjs/toolkit'

//import all reducers from slices

import authReducer from './slices/auth_slices/authSlice'
import bottomNavReducer from './slices/muslim_module_slices/bottomNavSlice';
import mosqueReducer from './slices/muslim_module_slices/mosqueSlice'
import muslimPreferencesReducer from './slices/muslim_module_slices/muslimPreferencesSlice';
import quranrecitationReducer from './slices/muslim_module_slices/reciteQuranSlice'
import announcementReducer from './slices/muslim_module_slices/muslimAnnouncementSlice'
import tasbihReducer from './slices/muslim_module_slices/tasbihSlice'
import namazAccountabilityReducer from './slices/muslim_module_slices/namazAccountabilitySlice'
import fastAccountabilityReducer from './slices/muslim_module_slices/fastAccountability';
import templeReducer from './slices/hindu_module_slices/templeSlice';
import learnNamazReducer from './slices/muslim_module_slices/learnNamazSlice';
import imamReducer from './slices/muslim_module_slices/imamSlice';

const store = configureStore({
  reducer: {
    user:authReducer,  
    mosque:mosqueReducer,
    bottomNav:bottomNavReducer,
    muslimpreferences:muslimPreferencesReducer,
    quranrecitation:quranrecitationReducer,
    announcement: announcementReducer,
    tasbih: tasbihReducer,
    namazAccountability: namazAccountabilityReducer,
    fastAccountability: fastAccountabilityReducer,
    temple: templeReducer,
    learnNamaz: learnNamazReducer,
    imam:imamReducer
  },
})

export default store;
