/**
 * @author Nadir Hussain
 * @version 1.0
 */

import React, {useRef, useState, useEffect} from 'react';
import {
  Animated,
  SafeAreaView,
  Share,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import {Image, Text, View} from 'native-base';

//tab icons
import profile_ic from '../../../../assets/images/profile_ic.png';
import about_ic from '../../../../assets/images/about_ic.png';
import share_ic from '../../../../assets/images/share_ic.png';

//logout icon
import logout_ic from '../../../../assets/images/logout_ic.png';

//menu icons
import menu from '../../../../assets/images/menu_ic.png';
import close from '../../../../assets/images/close_ic.png';
import help from '../../../../assets/images/help_ic.png';

//theme
import colors from '../../../theme/colors';
import fonts from '../../../theme/fonts';

//navigation
import {useNavigation} from '@react-navigation/native';
import {
  ABOUT,
  AUTH_STACK,
  HELP,
  HINDU_VIEW_PROFILE,
} from '../../../navigation/constants';

//components
import HinduBottomTab from './HinduBottomTab';
import Loader from '../../common/Loader';

//redux
import {useDispatch, useSelector} from 'react-redux';
import {
  deleteDeviveToken,
  getUserData,
  logout,
  selectHasError,
  selectIsLoadingGetUserData,
  selectUserData,
} from '../../../redux/slices/auth_slices/authSlice';
import {selectCurrentTab} from '../../../redux/slices/hindu_module_slices/bottomNavSlice';

//constants
import {defaultAvatar} from '../UIContants';

export default function RegisteredHinduDashboard() {
  const [currentTab, setCurrentTab] = useState('View Profile');

  // To get the curretn Status of menu ...
  const [showMenu, setShowMenu] = useState(false);

  // Animated Properties...

  const offsetValue = useRef(new Animated.Value(0)).current;
  // Scale Intially must be One...
  const scaleValue = useRef(new Animated.Value(1)).current;
  const closeButtonOffset = useRef(new Animated.Value(0)).current;

  const dispatch = useDispatch();
  const selectedTab = useSelector(selectCurrentTab);
  const user = useSelector(selectUserData);
  const isLoadingGetUserData = useSelector(selectIsLoadingGetUserData);
  const hasError = useSelector(selectHasError);

  useEffect(() => {
    if (!user) {
      dispatch(getUserData());
    }
  }, [dispatch, selectedTab]);
  return (
    <SafeAreaView style={styles.container}>
      {isLoadingGetUserData || hasError ? (
        <Loader msg="Loading Dashboard ..." />
      ) : (
        <View style={{justifyContent: 'flex-start', padding: 15}}>
          <View
            style={{
              alignItems: 'center',
            }}>
            <Image
              source={{uri: user ? user?.avatar : defaultAvatar}}
              style={{
                width: 80,
                height: 80,
                borderRadius: 50,
                marginTop: 8,
              }}
              resizeMode={'cover'}
              alt="Profile image"></Image>

            <Text
              style={{
                fontSize: 20,
                color: 'white',
                marginTop: 15,
                fontFamily: fonts.Signika.bold,
              }}>
              {user ? user?.username?.toUpperCase() : 'Guest'}
            </Text>
          </View>

          <View style={{flexGrow: 1, marginTop: 50}}>
            {
              // Tab Bar Buttons....
            }

            {user ? (
              TabButton(currentTab, setCurrentTab, 'View Profile', profile_ic)
            ) : (
              <></>
            )}
            {TabButton(currentTab, setCurrentTab, 'About', about_ic)}
            {TabButton(currentTab, setCurrentTab, 'Share App', share_ic)}
            {TabButton(currentTab, setCurrentTab, 'Help', help)}
          </View>

          <View>
            {TabButton(
              currentTab,
              setCurrentTab,
              user ? 'LogOut' : 'Exit',
              logout_ic,
            )}
          </View>
        </View>
      )}

      <Animated.View
        style={{
          flexGrow: 1,
          backgroundColor: colors.primary,
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          borderLeftColor: showMenu ? colors.secondary : colors.primary,
          borderLeftWidth: showMenu ? 1 : 0,
          borderTopColor: showMenu ? colors.secondary : colors.primary,
          borderTopWidth: showMenu ? 1 : 0,
          borderRadius: showMenu ? 15 : 0,
          // Transforming View...
          transform: [{scale: scaleValue}, {translateX: offsetValue}],
        }}>
        <Animated.View
          style={{
            transform: [
              {
                translateY: closeButtonOffset,
              },
            ],
          }}>
          {selectedTab == 'Home' ? (
            <View style={styles.appBar}>
              <TouchableOpacity
                onPress={() => {
                  Animated.timing(scaleValue, {
                    toValue: showMenu ? 1 : 0.88,
                    duration: 200,
                    useNativeDriver: true,
                  }).start();

                  Animated.timing(offsetValue, {
                    toValue: showMenu ? 0 : 230,
                    duration: 200,
                    useNativeDriver: true,
                  }).start();

                  Animated.timing(closeButtonOffset, {
                    toValue: !showMenu ? -30 : 0,
                    duration: 200,
                    useNativeDriver: true,
                  }).start();

                  setShowMenu(!showMenu);
                }}>
                <Image
                  source={showMenu ? close : menu}
                  key={showMenu}
                  style={{
                    width: 20,
                    height: 20,
                    tintColor: colors.white,
                    marginTop: showMenu ? 40 : 15,
                    marginLeft: showMenu ? 10 : 10,
                  }}
                  alt={showMenu ? 'Close' : 'Open'}></Image>
              </TouchableOpacity>
              <Text style={[styles.titleText, {marginTop: showMenu ? 40 : 15}]}>
                {selectedTab}
              </Text>
            </View>
          ) : (
            <></>
          )}
        </Animated.View>
        <HinduBottomTab />
      </Animated.View>
    </SafeAreaView>
  );
}

// For multiple Buttons...
const TabButton = (currentTab, setCurrentTab, title, image) => {
  const navigator = useNavigation();
  const dispatch = useDispatch();

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: 'https://www.google.com/',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // console.log('Shared');
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <TouchableOpacity
      onPress={() => {
        title = title.toLowerCase();

        if (title == 'logout' || title == 'exit') {
          dispatch(deleteDeviveToken({username}));
          dispatch(logout());
          navigator.navigate(AUTH_STACK);
        } else if (title == 'view profile') {
          navigator.navigate(HINDU_VIEW_PROFILE);
        } else if (title == 'about') {
          navigator.navigate(ABOUT);
        } else if (title == 'share app') {
          onShare();
          // // setCurrentTab(title);
        } else if (title == 'help') {
          navigator.navigate(HELP);
        }
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 8,
          backgroundColor: 'transparent',
          paddingLeft: 13,
          paddingRight: 35,
          borderRadius: 8,
          marginTop: 15,
        }}>
        <Image
          source={image}
          style={{
            width: 25,
            height: 25,
            tintColor: 'white',
          }}
          alt="Icon"></Image>

        <Text
          style={{
            fontSize: 15,
            paddingLeft: 15,
            fontFamily: fonts.Signika.semi_bold,
            color: 'white',
          }}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  appBar: {
    flexDirection: 'row',
  },
  titleText: {
    fontFamily: fonts.Signika.bold,
    color: colors.secondary,
    marginLeft: '36%',
    fontSize: 18,
  },
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
});
