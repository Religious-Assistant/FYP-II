import { configureStore } from '@reduxjs/toolkit'

//import all reducers from slices

import authReducer from './slices/auth_slices/authSlice'
import bottomNavReducer from './slices/muslim_module_slices/bottomNavSlice';
import mosqueReducer from './slices/muslim_module_slices/mosqueSlice'
import announcementReducer from './slices/muslim_module_slices/announcementSlice'
import tasbihReducer from './slices/muslim_module_slices/tasbihSlice'
import quranRecitationReducer from './slices/muslim_module_slices/quranRecitationSlice'
import namazAccountabilityReducer from './slices/muslim_module_slices/namazAccountability'
import fastAccountabilityReducer from './slices/muslim_module_slices/fastAccountability';
import muslimUserPrefReducer from './slices/muslim_module_slices/muslimUserPreferencesSlice';
import templeReducer from './slices/muslim_module_slices/templeSlice';
import learnNamazReducer from './slices/muslim_module_slices/learnNamazSlice';
import imamReducer from './slices/muslim_module_slices/imamSlice';
const store = configureStore({
  reducer: {
    user:authReducer,  
    mosque:mosqueReducer,
    bottomNav:bottomNavReducer,
    announcement: announcementReducer,
    tasbih: tasbihReducer,
    quranRecitation: quranRecitationReducer,
    namazAccountability: namazAccountabilityReducer,
    fastAccountability: fastAccountabilityReducer,
    muslimUserPref: muslimUserPrefReducer,
    temple: templeReducer,
    learnNamaz: learnNamazReducer,
    imam:imamReducer
  },
})

export default store;
