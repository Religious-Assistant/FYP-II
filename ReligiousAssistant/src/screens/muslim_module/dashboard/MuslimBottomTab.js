/**
 * @author Nadir
 * @version 1.0
 */

import React from 'react';
import {Image, Text, StyleSheet, View, TouchableOpacity} from 'react-native';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Settings from '../preferences/Settings';
import FindMosque from '../mosques/FindMosque';
import fonts from '../../../theme/fonts';
import NamazTimings from '../namazTimings/NamazTimings';
import Home from './Home';
import Alerts from '../alertsAndNotifications/Alerts';

const BottomTab = createBottomTabNavigator();

const AddMosqueButton = ({children, onPress}) => {
  return (
    <TouchableOpacity
      style={{
        top: -30,
        justifyContent: 'center',
        alignItems: 'center',
        ...styles.shadow,
      }}
      onPress={onPress}>
      <View
        style={{
          width: 70,
          height: 70,
          borderRadius: 35,
          backgroundColor: '#f3ba1c',
        }}>
        {children}
      </View>
    </TouchableOpacity>
  );
};


export default function MuslimBottomTab() {
  
  // const token=useSelector(selectToken) 

  return (
    <>
      <BottomTab.Navigator
        initialRouteName="Home"
        screenOptions={{
          tabBarActiveTintColor: '#12FF12',
          tabBarInactiveTintColor: '#12FF12',
          tabBarShowLabel: false,
          tabBarStyle: {
            position: 'absolute',
            bottom: 10,
            left: 7,
            right: 7,
            elevation: 0,
            borderRadius: 15,
            height: 90,
            paddingVertical: Platform.OS === 'ios' ? 20 : 0,
            ...styles.shadow,
          },
        }}>
        <BottomTab.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
            tabBarIcon: ({focused}) => {
              return(
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  top: 10,
                }}>
                <Image
                  source={require('../../../../assets/images/home_ic.png')}
                  resizeMode="contain"
                  style={{
                    width: 25,
                    height: 25,
                    tintColor: focused ? '#f3ba1c' : '#0f1e3d',
                  }}></Image>
                <Text
                  style={[
                    styles.tabItemText,
                    {color: focused ? '#f3ba1c' : '#0f1e3d'},
                  ]}>
                  Home
                </Text>
              </View>
            )},
          }}
        />
        {
          <BottomTab.Screen
          name="Alerts"
          component={Alerts}
          options={{
            // tabBarLabel:'Home',
            headerShown: false,
            tabBarIcon: ({focused}) => {
              return(
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  top: 10,
                }}>
                <Image
                  source={require('../../../../assets/images/notifications_ic.png')}
                  resizeMode="contain"
                  style={{
                    width: 25,
                    height: 25,
                    tintColor: focused ? '#f3ba1c' : '#0f1e3d',
                  }}></Image>
                <Text
                  style={[
                    styles.tabItemText,
                    {color: focused ? '#f3ba1c' : '#0f1e3d'},
                  ]}>
                  Alerts
                </Text>
              </View>
            )},
          }}
        />
        }

        <BottomTab.Screen
          name="FindMosque"
          component={FindMosque}
          options={{
            // tabBarLabel:'Home',
            headerShown: false,
            tabBarIcon: ({focused}) => {
              return(
              <Image
                source={require('../../../../assets/images/search_mosque_ic.png')}
                resizeMode="contain"
                style={{
                  width: 30,
                  height: 30,
                  tintColor: '#fff',
                }}></Image>
            )},
            tabBarButton:  props =>(<AddMosqueButton {...props} />),
          }}
        />

        <BottomTab.Screen
          name="Prayers"
          component={NamazTimings}
          options={{
            // tabBarLabel:'Home',
            headerShown: false,
            tabBarIcon: ({focused}) => {
              return(
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  top: 10,
                }}>
                <Image
                  source={require('../../../../assets/images/time_ic.png')}
                  resizeMode="contain"
                  style={{
                    width: 25,
                    height: 25,
                    tintColor: focused ? '#f3ba1c' : '#0f1e3d',
                  }}></Image>
                <Text
                  style={[
                    styles.tabItemText,
                    {color: focused ? '#f3ba1c' : '#0f1e3d'},
                  ]}>
                  Prayers
                </Text>
              </View>
            )},
          }}
        />
        <BottomTab.Screen
          name="Settings"
          component={Settings}
          options={{
            // tabBarLabel:'Home',
            headerShown: false,
            tabBarIcon: ({focused}) => {
            return(
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  top: 10,
                }}>
                <Image
                  source={require('../../../../assets/images/settings_ic.png')}
                  resizeMode="contain"
                  style={{
                    width: 25,
                    height: 25,
                    tintColor: focused ? '#f3ba1c' : '#0f1e3d',
                  }}></Image>
                <Text
                  style={[
                    styles.tabItemText,
                    {color: focused ? '#f3ba1c' : '#0f1e3d'},
                  ]}>
                  Settings
                </Text>
              </View>
            )},
          }}
        />
      </BottomTab.Navigator>
    </>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.5,
    elevation: 5,
  },
  tabItemText: {
    fontSize: 12,
    fontFamily: fonts.Signika.medium,
  },
});