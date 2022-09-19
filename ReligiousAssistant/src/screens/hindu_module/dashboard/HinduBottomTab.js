/**
 * @author Nadir
 * @version 1.0
 */

import React, {useEffect} from 'react';
import {Image, Text, StyleSheet, View, TouchableOpacity} from 'react-native';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

//Screens
import Settings from '../preferences/Settings';
import fonts from '../../../theme/fonts';
import Home from './Home';
import FindTemple from '../temple/FindTemple';
import Prayers from '../prayers/Prayers';
import Alerts from '../alertsAndNotifications/Alerts';

//theme
import colors from '../../../theme/colors';

//navigation
import {
  FIND_TEMPLE,
  HINDU_ALERTS,
  HINDU_HOME,
  HINDU_PRAYERS,
  HINDU_SETTINGS,
} from '../../../navigation/constants';

//redux
import {useDispatch, useSelector} from 'react-redux';
import {
  getUserData,
  selectUserData,
} from '../../../redux/slices/auth_slices/authSlice';
import {selectHinduNotifications} from '../../../redux/slices/hindu_module_slices/hinduNotificationSlice';

const BottomTab = createBottomTabNavigator();

const FindTempleButton = ({children, onPress}) => {
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
          backgroundColor: colors.red,
        }}>
        {children}
      </View>
    </TouchableOpacity>
  );
};

export default function HinduBottomTab() {
  const dispatch = useDispatch();
  const notifications = useSelector(selectHinduNotifications);
  const user = useSelector(selectUserData);

  useEffect(() => {
    dispatch(getUserData());
  }, []);

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
          name={HINDU_HOME}
          component={Home}
          options={{
            headerShown: false,
            tabBarIcon: ({focused}) => (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  top: 10,
                }}>
                <Image
                  source={{uri:'https://res.cloudinary.com/nadirhussainnn/image/upload/v1663577864/religious-assistant/static_assets/home_ic_yb67jc.png'}}
                  resizeMode="contain"
                  style={{
                    width: 25,
                    height: 25,
                    tintColor: focused ? colors.red : '#0f1e3d',
                  }}></Image>
                <Text
                  style={[
                    styles.tabItemText,
                    {color: focused ? colors.red : '#0f1e3d'},
                  ]}>
                  Home
                </Text>
              </View>
            ),
          }}
        />
        {user ? (
          <BottomTab.Screen
            name={HINDU_ALERTS}
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
              tabBarIcon: ({focused}) => (
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    top: 10,
                  }}>
                  <Image
                    source={{uri:'https://res.cloudinary.com/nadirhussainnn/image/upload/v1663577910/religious-assistant/static_assets/notifications_ic_wjdd4q.png'}}
                    resizeMode="contain"
                    style={{
                      width: 25,
                      height: 25,
                      tintColor: focused ? colors.red : '#0f1e3d',
                    }}></Image>
                  <Text
                    style={[
                      styles.tabItemText,
                      {color: focused ? colors.red : '#0f1e3d'},
                    ]}>
                    Alerts
                  </Text>
                </View>
              ),
            }}
          />
        ) : (
          <></>
        )}

        <BottomTab.Screen
          name={FIND_TEMPLE}
          component={FindTemple}
          options={{
            // tabBarLabel:'Home',
            headerShown: false,
            tabBarIcon: ({focused}) => (
              <Image
                source={{uri:'https://res.cloudinary.com/nadirhussainnn/image/upload/v1663583244/religious-assistant/static_assets/search_temple_ic_p3rikq.png'}}
                resizeMode="contain"
                style={{
                  width: 50,
                  height: 50,
                  tintColor: '#fff',
                }}></Image>
            ),
            tabBarButton: props => <FindTempleButton {...props} />,
          }}
        />

        <BottomTab.Screen
          name={HINDU_PRAYERS}
          component={Prayers}
          options={{
            // tabBarLabel:'Home',
            headerShown: false,
            tabBarIcon: ({focused}) => (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  top: 10,
                }}>
                <Image
                  source={{uri:'https://res.cloudinary.com/nadirhussainnn/image/upload/v1663583245/religious-assistant/static_assets/info_ic1_fozctf.png'}}
                  resizeMode="contain"
                  style={{
                    width: 25,
                    height: 25,
                    tintColor: focused ? colors.red : '#0f1e3d',
                  }}></Image>
                <Text
                  style={[
                    styles.tabItemText,
                    {color: focused ? colors.red : '#0f1e3d'},
                  ]}>
                  Prayers
                </Text>
              </View>
            ),
          }}
        />

        {user ? (
          <BottomTab.Screen
            name={HINDU_SETTINGS}
            component={Settings}
            options={{
              // tabBarLabel:'Home',
              headerShown: false,
              tabBarIcon: ({focused}) => (
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    top: 10,
                  }}>
                  <Image
                    source={{uri:'https://res.cloudinary.com/nadirhussainnn/image/upload/v1663577812/religious-assistant/static_assets/settings_ic_dolfie.png'}}
                    resizeMode="contain"
                    style={{
                      width: 25,
                      height: 25,
                      tintColor: focused ? colors.red : '#0f1e3d',
                    }}></Image>
                  <Text
                    style={[
                      styles.tabItemText,
                      {color: focused ? colors.red : '#0f1e3d'},
                    ]}>
                    Settings
                  </Text>
                </View>
              ),
            }}
          />
        ) : (
          <></>
        )}
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
