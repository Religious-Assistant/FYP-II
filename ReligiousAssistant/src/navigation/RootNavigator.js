/**
 * @author Nadir Hussain
 * @version 1.0
 */

import React from 'react'

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ReciteQuran from '../screens/muslim_module/ReciteQuran';
import RegisteredMuslimDashboard from '../screens/muslim_module/RegisteredMuslimDashboard';
import Notifications from '../screens/muslim_module/Notifications'
import Profile from '../screens/muslim_module/Profile'
import Announcements from '../screens/muslim_module/Announcements'
import Settings from '../screens/muslim_module/Settings'
import MuslimBottomTab from '../screens/muslim_module/MuslimBottomTab';
import CustomDrawer from '../screens/muslim_module/CustomDrawer';

const MainStack=createNativeStackNavigator()
const AuthStack=createNativeStackNavigator();


function AuthStackNavigation(){
    return(
        
        <AuthStack.Navigator initialRouteName='Login' >
            <AuthStack.Screen name='Login' component={LoginScreen} options={{headerShown:false}} />
            <AuthStack.Screen name='Register' component={RegisterScreen} options={{headerShown:false}}/>
        </AuthStack.Navigator>
        
    )
}

export default function RootNavigator() {
  return (
    <NavigationContainer>
        <MainStack.Navigator initialRouteName='Auth'>
            <MainStack.Screen name='Auth' component={AuthStackNavigation} options={{headerShown:false}}/>
            <MainStack.Screen name='Dashboard' component={RegisteredMuslimDashboard} options={{headerShown:false}}/>
        </MainStack.Navigator>
    </NavigationContainer>
  )
}