/**
 * @author Nadir Hussain
 * @version 1.0
 */

import React from 'react'

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { AUTH_STACK, REGISTERED_HINDU_DASHBOARD_STACK, REGISTERED_MUSLIM_DASHBOARD_STACK } from './constants';
import AuthStackNavigation from './AuthNavigation';
import MuslimDashboardNavigation from './MuslimDashboardNavigation';
import HinduDashboardNavigation from './HinduDashboardNavigation';
import SplashScreeen from '../screens/SplashScreeen';


const MainStack=createNativeStackNavigator()


export default function RootNavigator() {
  return (
    <NavigationContainer>
        <MainStack.Navigator initialRouteName={AUTH_STACK}>
        {/* <MainStack.Screen name='SPLASH_SCREEN' component={SplashScreeen} options={{headerShown:false}}/>             */}
            <MainStack.Screen name={AUTH_STACK} component={AuthStackNavigation} options={{headerShown:false}}/>
            <MainStack.Screen name={REGISTERED_MUSLIM_DASHBOARD_STACK} component={MuslimDashboardNavigation} options={{headerShown:false}}/>
            <MainStack.Screen name={REGISTERED_HINDU_DASHBOARD_STACK} component={HinduDashboardNavigation} options={{headerShown:false}}/>

            {/* <MainStack.Screen name={REGISTERED_MUSLIM_DASHBOARD_STACK} component={ReciteQuran} options={{headerShown:false}}/> */}
        </MainStack.Navigator>
    </NavigationContainer>
  )
}