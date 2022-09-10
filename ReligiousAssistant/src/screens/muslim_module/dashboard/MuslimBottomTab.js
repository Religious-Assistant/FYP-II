/**
 * @author Nadir Hussain
 * @version 1.0
 */

import React, {useEffect} from 'react';
import {Image, Text, StyleSheet, View, TouchableOpacity} from 'react-native';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

//componnets
import Settings from '../preferences/Settings';
import FindMosque from '../mosques/FindMosque';
import NamazTimeByMoque from '../namazTimings/NamazTimeByMoque';
import Home from './Home';
import Alerts from '../alertsAndNotifications/Alerts';

//fonts
import fonts from '../../../theme/fonts';
import colors from '../../../theme/colors';

//navigation
import {
  FIND_MOSQUE,
  MUSLIM_ALERTS,
  MUSLIM_HOME,
  MUSLIM_PRAYERS,
  MUSLIM_SETTINGS,
} from '../../../navigation/constants';

//redux
import {useDispatch, useSelector} from 'react-redux';
import {selectMuslimNotifications} from '../../../redux/slices/muslim_module_slices/muslimNotificationSlice';
import {
  getUserData,
  selectUserData,
} from '../../../redux/slices/auth_slices/authSlice';

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
          backgroundColor: colors.success.light,
        }}>
        {children}
      </View>
    </TouchableOpacity>
  );
};

export default function MuslimBottomTab() {
  const dispatch = useDispatch();
  const notifications = useSelector(selectMuslimNotifications);
  const user = useSelector(selectUserData);

  useEffect(() => {
    dispatch(getUserData());
  }, []);

  return (
    <>
      <BottomTab.Navigator
        initialRouteName={MUSLIM_HOME}
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
          name={MUSLIM_HOME}
          component={Home}
          options={{
            headerShown: false,
            tabBarIcon: ({focused}) => {
              return (
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
                      tintColor: focused ? colors.success.light : '#0f1e3d',
                    }}></Image>
                  <Text
                    style={[
                      styles.tabItemText,
                      {color: focused ? colors.success.light : '#0f1e3d'},
                    ]}>
                    Home
                  </Text>
                </View>
              );
            },
          }}
        />
        {
          <BottomTab.Screen
            name={MUSLIM_ALERTS}
            component={Alerts}
            options={{
              // tabBarLabel:'Home',
              headerShown: false,
              tabBarBadge: notifications ? notifications.length : null,
              tabBarBadgeStyle: {
                color: colors.primary,
                backgroundColor: colors.secondary,
                marginTop: 15,
              },
              tabBarIcon: ({focused}) => {
                return (
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
                        tintColor: focused ? colors.success.light : '#0f1e3d',
                      }}></Image>
                    <Text
                      style={[
                        styles.tabItemText,
                        {color: focused ? colors.success.light : '#0f1e3d'},
                      ]}>
                      Alerts
                    </Text>
                  </View>
                );
              },
            }}
          />
        }
        
        <BottomTab.Screen
          name={FIND_MOSQUE}
          component={FindMosque}
          options={{
            // tabBarLabel:'Home',
            headerShown: false,
            tabBarIcon: ({focused}) => {
              return (
                <Image
                  source={require('../../../../assets/images/search_mosque_ic.png')}
                  resizeMode="contain"
                  style={{
                    width: 30,
                    height: 30,
                    tintColor: colors.primary,
                  }}></Image>
              );
            },
            tabBarButton: props => <AddMosqueButton {...props} />,
          }}
        />

        <BottomTab.Screen
          name={MUSLIM_PRAYERS}
          component={NamazTimeByMoque}
          options={{
            // tabBarLabel:'Home',
            headerShown: false,
            tabBarIcon: ({focused}) => {
              return (
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
                      tintColor: focused ? colors.success.light : '#0f1e3d',
                    }}></Image>
                  <Text
                    style={[
                      styles.tabItemText,
                      {color: focused ? colors.success.light : '#0f1e3d'},
                    ]}>
                    Prayers
                  </Text>
                </View>
              );
            },
          }}
        />
        <BottomTab.Screen
          name={MUSLIM_SETTINGS}
          component={Settings}
          options={{
            // tabBarLabel:'Home',
            headerShown: false,
            tabBarIcon: ({focused}) => {
              return (
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
                      tintColor: focused ? colors.success.light : '#0f1e3d',
                    }}></Image>
                  <Text
                    style={[
                      styles.tabItemText,
                      {color: focused ? colors.success.light : '#0f1e3d'},
                    ]}>
                    Settings
                  </Text>
                </View>
              );
            },
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
