/**
 * @author Nadir Hussain
 * @version 1.0
 */

import React from 'react'

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { AUTH_STACK, REGISTERED_MUSLIM_DASHBOARD_STACK } from './constants';
import AuthStackNavigation from './AuthNavigation';
import MuslimDashboardNavigation from './MuslimDashboardNavigation';
import ReciteQuran from '../screens/muslim_module/ReciteQuran';


const MainStack=createNativeStackNavigator()


export default function RootNavigator() {
  return (
    <NavigationContainer>
        <MainStack.Navigator initialRouteName={REGISTERED_MUSLIM_DASHBOARD_STACK}>
            <MainStack.Screen name={AUTH_STACK} component={AuthStackNavigation} options={{headerShown:false}}/>
            <MainStack.Screen name={REGISTERED_MUSLIM_DASHBOARD_STACK} component={MuslimDashboardNavigation} options={{headerShown:false}}/>
            {/* <MainStack.Screen name={REGISTERED_MUSLIM_DASHBOARD_STACK} component={ReciteQuran} options={{headerShown:false}}/> */}
        </MainStack.Navigator>
    </NavigationContainer>
  )
}