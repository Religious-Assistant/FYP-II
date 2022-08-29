/**
 * @author Nadir
 * @version 1.0
 */

import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

//constants
import {
  ABOUT,
  ADD_TEMPLE,
  FIND_TEMPLE,
  GITA_CHAPTER_RECITATION_AREA,
  GITA_SUMMARY_RECITATION_AREA,
  GOOGLE_MAP,
  GOOGLE_MAP_DIRECTIONS_FOR_HINDU_USERS,
  HELP,
  HINDU_ANNOUNCEMENTS,
  HINDU_AUTO_SILENT,
  HINDU_USER_ANNOUNCEMENT_DETAILS,
  HINDU_USER_MAKE_ANNOUNCEMENT_SCREEN,
  HINDU_VIEW_PROFILE,
  NEW_TEMPLE_ADDITION,
  RECITE_GITA,
  REGISTERED_HINDU_HOME_STACK,
  TEMPLE_CONSENSUS,
  VEG_DAYS,
  VIEW_HINDU_CALANDER,
} from './constants';

//screens
import RegisteredHinduDashboard from '../screens/hindu_module/dashboard/RegisteredHinduDashboard';
import FindTemple from '../screens/hindu_module/temple/FindTemple';
import Calander from '../screens/hindu_module/calander/Calander';
import Announcements from '../screens/hindu_module/announcements/Announcements';
import AutoSilent from '../screens/hindu_module/preferences/AutoSilent';
import AddTemple from '../screens/hindu_module/temple/AddTemple';
import ReciteGita from '../screens/hindu_module/reciteGita/ReciteGita';
import TempleConsensusNoti from '../screens/hindu_module/alertsAndNotifications/TempleConsensusNoti';
import NewTempleAddedNoti from '../screens/hindu_module/alertsAndNotifications/NewTempleAddedNoti';
import MakeAnnouncement from '../screens/hindu_module/announcements/MakeAnnouncement';
import Profile from '../screens/hindu_module/preferences/Profile';
import About from '../screens/common/About';
import Map from '../components/Map';
import MapDirectionForHindus from '../components/MapDirectionForHindus';
import UserManual from '../screens/common/UserManual';
import VegNonVegDays from '../screens/hindu_module/vegNonVegDays/VegNonVegDays';
import ChapterRecitationArea from '../screens/hindu_module/reciteGita/ChapterRecitationArea';
import SummaryRecitationArea from '../screens/hindu_module/reciteGita/SummaryRecitationArea';
import AnnouncementNoti from '../screens/hindu_module/alertsAndNotifications/AnnouncementNoti';

const HomeStack = createNativeStackNavigator();

function HinduDashboardNavigation() {
  return (
    <HomeStack.Navigator initialRouteName={REGISTERED_HINDU_HOME_STACK}>
      <HomeStack.Screen
        name={REGISTERED_HINDU_HOME_STACK}
        component={RegisteredHinduDashboard}
        options={{headerShown: false}}
      />

      {/* Add screen for Veg/Non veg days */}

      <HomeStack.Screen
        name={RECITE_GITA}
        component={ReciteGita}
        options={{title: 'Recite Gita'}}
      />

      <HomeStack.Screen
        name={VEG_DAYS}
        component={VegNonVegDays}
        options={{title: 'Recite Gita'}}
      />

      <HomeStack.Screen
        name={FIND_TEMPLE}
        component={FindTemple}
        options={{title: 'Find Temple'}}
      />
      <HomeStack.Screen
        name={VIEW_HINDU_CALANDER}
        component={Calander}
        options={{title: 'View Calander'}}
      />
      <HomeStack.Screen
        name={HINDU_ANNOUNCEMENTS}
        component={Announcements}
        options={{title: 'Announcements'}}
      />

      <HomeStack.Screen
        name={HINDU_USER_ANNOUNCEMENT_DETAILS}
        component={AnnouncementNoti}
        options={{title: 'Announcements'}}
      />

      <HomeStack.Screen
        name={HINDU_AUTO_SILENT}
        component={AutoSilent}
        options={{title: 'Auto Silent'}}
      />
      <HomeStack.Screen
        name={ADD_TEMPLE}
        component={AddTemple}
        options={{title: 'Add Temple'}}
      />

      <HomeStack.Screen
        name={TEMPLE_CONSENSUS}
        component={TempleConsensusNoti}
        options={{title: 'Temple Consensus'}}
      />

      <HomeStack.Screen
        name={NEW_TEMPLE_ADDITION}
        component={NewTempleAddedNoti}
        options={{title: 'New Mosque'}}
      />

      <HomeStack.Screen
        name={HINDU_USER_MAKE_ANNOUNCEMENT_SCREEN}
        component={MakeAnnouncement}
        options={{title: 'Announcements'}}
      />

      <HomeStack.Screen
        name={HINDU_VIEW_PROFILE}
        component={Profile}
        options={{title: 'Profile'}}
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
        name={GOOGLE_MAP_DIRECTIONS_FOR_HINDU_USERS}
        component={MapDirectionForHindus}
        options={{title: 'Get Directions'}}
      />

      <HomeStack.Screen
        name={HELP}
        component={UserManual}
        options={{title: 'Help'}}
      />

      <HomeStack.Screen
        name={GITA_CHAPTER_RECITATION_AREA}
        component={ChapterRecitationArea}
        options={{title: 'Chapter'}}
      />

      <HomeStack.Screen
        name={GITA_SUMMARY_RECITATION_AREA}
        component={SummaryRecitationArea}
        options={{title: 'Summary'}}
      />
    </HomeStack.Navigator>
  );
}

export default HinduDashboardNavigation;
