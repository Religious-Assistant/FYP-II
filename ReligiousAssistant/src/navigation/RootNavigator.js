/**
 * @author Nadir Hussain
 * @version 1.0
 */

import React from 'react'
import { View, Text } from 'react-native'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ReciteQuran from '../screens/muslim_module/ReciteQuran';
import RegisteredMuslimDashboard from '../screens/muslim_module/RegisteredMuslimDashboard';
import Notifications from '../screens/muslim_module/Notifications'
import Profile from '../screens/muslim_module/Profile'
import Announcements from '../screens/muslim_module/Announcements'
import Settings from '../screens/muslim_module/Settings'
import MuslimBottomTab from '../screens/muslim_module/MuslimBottomTab';

const AuthStack=createNativeStackNavigator();

const MuslimDashboardStack=createNativeStackNavigator();
// const MuslimBottomTab=createBottomTabNavigator()
const MuslimDrawerNav=createBottomTabNavigator()

const MuslimImamDashboardStack=createNativeStackNavigator();
const MuslimImamBottomTab=createBottomTabNavigator()
const MuslimImamDrawerNav=createBottomTabNavigator()

const MuslimGuestDashboardStack=createNativeStackNavigator();   
const MuslimGuestBottomTab=createBottomTabNavigator()
const MuslimGuestDrawerNav=createBottomTabNavigator()

const HinduDashboardStack=createNativeStackNavigator();
const HinduBottomTab=createBottomTabNavigator()
const HinduDrawerNav=createBottomTabNavigator()

const HinduGuestDashboardStack=createNativeStackNavigator();
const HinduGuestBottomTab=createBottomTabNavigator()
const HinduGuestDrawerNav=createBottomTabNavigator()

const MainStack=createNativeStackNavigator()

function AuthStackNavigation(){
    return(
        
        <AuthStack.Navigator initialRouteName='Login' >
            <AuthStack.Screen name='Login' component={LoginScreen} options={{headerShown:false}} />
            <AuthStack.Screen name='Register' component={RegisterScreen} options={{headerShown:false}}/>
        </AuthStack.Navigator>
        
    )
}

function MuslimDashboardStackNavigation(){

    return(
        <MuslimDashboardStack.Navigator>
        <MuslimDashboardStack.Screen name='ReciteQuran' component={MuslimDashboardTabNavigation} options={{headerShown:false}}/>
        {/* Add all other stack screens */}

    </MuslimDashboardStack.Navigator>
    )
}

// function MuslimDashboardTabNavigation(){
    
//     return(
//         <MuslimBottomTab.Navigator initialRouteName='Home'>
//             <MuslimBottomTab.Screen name='Home' component={RegisteredMuslimDashboard} options={{headerShown:false}} />
//             <MuslimBottomTab.Screen name='Notifications' component={Notifications} options={{headerShown:false}}/>
//             <MuslimBottomTab.Screen name='Profile' component={Profile} options={{headerShown:false}}/>
//             <MuslimBottomTab.Screen name='Announcements' component={Announcements} options={{headerShown:false}}/>
//             <MuslimBottomTab.Screen name='Settings' component={Settings} options={{headerShown:false}}/>
//         </MuslimBottomTab.Navigator>
//     )
// }
export default function RootNavigator() {
  return (
    <NavigationContainer>
        <MainStack.Navigator initialRouteName='Auth'>
            <MainStack.Screen name='Auth' component={AuthStackNavigation} options={{headerShown:false}}/>
            <MainStack.Screen name='RegisteredMuslimDashboard' component={MuslimBottomTab} options={{headerShown:false}}/>
        </MainStack.Navigator>
    </NavigationContainer>
  )
}