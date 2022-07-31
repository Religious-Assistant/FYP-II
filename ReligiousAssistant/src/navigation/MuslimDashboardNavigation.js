/**
 * @author Nadir
 * @version 1.0
 */

import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {
  ABOUT,
  ACCOUNTABILITY,
  ADD_MOSQUE,
  APPLY_AS_IMAM,
  AUTO_SILENT,
  FIND_MOSQUE,
  GOOGLE_MAP,
  GOOGLE_MAP_DIRECTIONS,
  LEARN_NAMAZ,
  MAKE_ANNOUNCEMENT_SCREEN,
  MUSLIM_ANNOUNCEMENTS,
  MUSLIM_USER_ANNOUNCEMENT_DETAILS,
  MUSLIM_VIEW_PROFILE,
  NAMAZ_PLAY_AREA,
  PARAH_RECITATION_AREA,
  QIBLA_DIRECTION,
  RAKAH_INFO,
  RECITE_QURAN,
  REGISTERED_MUSLIM_HOME_STACK,
  SHARE_APP,
  SURAH_RECITATION_AREA,
  TASBIH_COUNTER,
  VIEW_CALANDER,
} from './constants';

import RegisteredMuslimDashboard from '../screens/muslim_module/dashboard/RegisteredMuslimDashboard';
import ReciteQuran from '../screens/muslim_module/reciteQuran/ReciteQuran';
import FindMosque from '../screens/muslim_module/mosques/FindMosque';
import Calander from '../screens/muslim_module/calander/Calander';
import LearnNamaz from '../screens/muslim_module/learnNamaz/LearnNamaz';
import Accountability from '../screens/muslim_module/accountability/Accountability';
import Announcements from '../screens/muslim_module/announcements/Announcements';
import RakahInfo from '../screens/muslim_module/staticInfo/RakahInfo';
import QiblaDirection from '../screens/muslim_module/qiblaDirection/QiblaDirection';
import TasbihCounter from '../screens/muslim_module/tasbih/TasbihCounter';
import AddMosque from '../screens/muslim_module/mosques/AddMosque';
import AutoSilent from '../screens/muslim_module/preferences/AutoSilent';
import NamazPlayArea from '../screens/muslim_module/learnNamaz/NamazPlayArea';
import MakeAnnouncement from '../screens/muslim_module/announcements/MakeAnnouncement';

import Profile from '../screens/muslim_module/preferences/Profile';
import ApplyAsImam from '../screens/muslim_module/imam/ApplyAsImam';
import ShareApp from '../screens/common/ShareApp';
import About from '../screens/common/About';
import Map from '../components/Map';
import MapDirection from '../components/MapDirection';
import SurahRecitationArea from '../screens/muslim_module/reciteQuran/SurahRecitationArea';
import ParahRecitationArea from '../screens/muslim_module/reciteQuran/ParahRecitationArea';
import AnnouncementNoti from '../screens/muslim_module/alertsAndNotifications/AnnouncementNoti';

const HomeStack = createNativeStackNavigator();

function MuslimDashboardNavigation() {
  return (

    <HomeStack.Navigator initialRouteName={REGISTERED_MUSLIM_HOME_STACK}>
      <HomeStack.Screen
        name={REGISTERED_MUSLIM_HOME_STACK}
        component={RegisteredMuslimDashboard}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name={RECITE_QURAN}
        component={ReciteQuran}
        options={{title: 'Recite Quran'}}
      />
      <HomeStack.Screen
        name={SURAH_RECITATION_AREA}
        component={SurahRecitationArea}
        options={{title: 'Recitation'}}
      />

      <HomeStack.Screen
        name={PARAH_RECITATION_AREA}
        component={ParahRecitationArea}
        options={{title: 'Recitation'}}
      />

      <HomeStack.Screen
        name={FIND_MOSQUE}
        component={FindMosque}
        options={{title: 'Find Mosque'}}
      />
      <HomeStack.Screen
        name={VIEW_CALANDER}
        component={Calander}
        options={{title: 'Calander'}}
      />

      <HomeStack.Screen
        name={LEARN_NAMAZ}
        component={LearnNamaz}
        options={{title: 'Learn Namaz'}}
      />

      <HomeStack.Screen
        name={NAMAZ_PLAY_AREA}
        component={NamazPlayArea}
        options={{title:'Learn Area'}}
      />
      <HomeStack.Screen
        name={ACCOUNTABILITY}
        component={Accountability}
        options={{title: 'Accountability'}}
      />
      <HomeStack.Screen
        name={MUSLIM_ANNOUNCEMENTS}
        component={Announcements}
        options={{title: 'Announcements'}}
      />
      <HomeStack.Screen
        name={MUSLIM_USER_ANNOUNCEMENT_DETAILS}
        component={AnnouncementNoti}
        options={{title: 'Announcement'}}
      />

    <HomeStack.Screen
        name={MAKE_ANNOUNCEMENT_SCREEN}
        component={MakeAnnouncement}
        options={{title: 'Announcements'}}
      />

      <HomeStack.Screen
        name={AUTO_SILENT}
        component={AutoSilent}
        options={{title: 'Auto Silent'}}
      />
      <HomeStack.Screen
        name={ADD_MOSQUE}
        component={AddMosque}
        options={{title: 'Add Mosque'}}
      />
      <HomeStack.Screen
        name={TASBIH_COUNTER}
        component={TasbihCounter}
        options={{title: 'Tasbih'}}
      />

      <HomeStack.Screen
        name={QIBLA_DIRECTION}
        component={QiblaDirection}
        options={{title: 'Find Qibla'}}
      />
      <HomeStack.Screen
        name={RAKAH_INFO}
        component={RakahInfo}
        options={{title: 'Rakah Info'}}
      />

      {/* Define Drawer navigation */}
      <HomeStack.Screen
        name={MUSLIM_VIEW_PROFILE}
        component={Profile}
        options={{title: 'Profile'}}
      />
      
      <HomeStack.Screen
        name={APPLY_AS_IMAM}
        component={ApplyAsImam}
        options={{title: 'Apply As Imam'}}
      />
      
      <HomeStack.Screen
        name={SHARE_APP}
        component={ShareApp}
        options={{title: 'Share App'}}
      />
      
      <HomeStack.Screen
        name={ABOUT}
        component={About}
        options={{title: 'About'}}
      />
      
      <HomeStack.Screen
        name={GOOGLE_MAP}
        component={Map}
        options={{title: 'Google Map'}}
      />
      <HomeStack.Screen
        name={GOOGLE_MAP_DIRECTIONS}
        component={MapDirection}
        options={{title: 'Get Directions'}}
      />
    </HomeStack.Navigator>
  );
}

export default MuslimDashboardNavigation;
