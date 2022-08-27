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
import learnNamazReducer from './slices/muslim_module_slices/learnNamazSlice';
import imamReducer from './slices/muslim_module_slices/imamSlice';
import muslimNotificationReducer from './slices/muslim_module_slices/muslimNotificationSlice';
import msqueNamzTimesReducer from './slices/muslim_module_slices/mosqueNamazTimingsSlice'
import namazAlarmTimesReducer from './slices/muslim_module_slices/namazAlarmsSlice'

//Hindu user slice
import hinduBottomNavReducer from './slices/hindu_module_slices/bottomNavSlice'
import hinduNotificationReducer from './slices/hindu_module_slices/hinduNotificationSlice';
import hinduPreferencesSliceReducer from './slices/hindu_module_slices/hinduPreferencesSlice';
import templeReducer from './slices/hindu_module_slices/templeSlice'
import hinduAnnouncementReducer from './slices/hindu_module_slices/hinduAnnouncementSlice'
import gitarecitationReducer from './slices/hindu_module_slices/reciteGitaSlice'
import vegNonVegReducer from './slices/hindu_module_slices/vegNonVegSlice'

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
    learnNamaz: learnNamazReducer,
    imam:imamReducer,
    muslim_notifications:muslimNotificationReducer,
    mosque_namaz_times:msqueNamzTimesReducer,
    namaz_alarms:namazAlarmTimesReducer,

    // Hindu user reducers
    hindu_bottom_nav:hinduBottomNavReducer,
    hindu_notifications:hinduNotificationReducer,
    hindupreferences:hinduPreferencesSliceReducer,
    temple:templeReducer,
    hindu_announcement:hinduAnnouncementReducer,
    gitarecitation:gitarecitationReducer,
    vegnonveg:vegNonVegReducer
  },
})

export default store;
