/**
 * @author Nadir
 * @version 1.0
 */

import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {
  ADD_TEMPLE,
  FIND_TEMPLE,
  HINDU_ANNOUNCEMENTS,
  HINDU_AUTO_SILENT,
  RECITE_GITA,
  REGISTERED_HINDU_HOME_STACK,
  VIEW_HINDU_CALANDER,
} from './constants';

import RegisteredHinduDashboard from '../screens/hindu_module/dashboard/RegisteredHinduDashboard';
import FindTemple from '../screens/hindu_module/temple/FindTemple';
import Calander from '../screens/hindu_module/calander/Calander';
import Announcements from '../screens/hindu_module/announcements/Announcements';
import AutoSilent from '../screens/hindu_module/preferences/AutoSilent';
import AddTemple from '../screens/hindu_module/temple/AddTemple'
import ReciteGita from '../screens/hindu_module/reciteGita/ReciteGita';

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
        name={HINDU_AUTO_SILENT}
        component={AutoSilent}
        options={{title: 'Auto Silent'}}
      />
      <HomeStack.Screen
        name={ADD_TEMPLE}
        component={AddTemple}
        options={{title: 'Add Temple'}}
      />
    </HomeStack.Navigator>
  );
}

export default HinduDashboardNavigation;
