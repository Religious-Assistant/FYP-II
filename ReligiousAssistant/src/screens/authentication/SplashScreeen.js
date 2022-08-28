/**
 * @author Kinza Kiran
 * @version 1.0
 */

import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {StyleSheet, ImageBackground, Dimensions} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import PushNotification from 'react-native-push-notification';
import appIcon from '../../../assets/images/Logo-muslim.png';

import bg_gif from '../../../assets/images/splash.gif';
import {
  LOGIN,
  REGISTERED_HINDU_DASHBOARD_STACK,
  REGISTERED_MUSLIM_DASHBOARD_STACK,
} from '../../navigation/constants';
import {
  getReligion,
  getToken,
  getUpdatedUserData,
  getUserData,
  logout,
  selectReligion,
  selectToken,
  selectUserData,
} from '../../redux/slices/auth_slices/authSlice';

//Logout user if token is expired in AsyncStorage
import jwtDecode from 'jwt-decode';
import {setHours} from '../../utils/helpers';
import moment from 'moment';

function SplashScreeen() {
  const navigator = useNavigation();
  const dispatch = useDispatch();

  const token = useSelector(selectToken);
  const religion = useSelector(selectReligion);
  const user = useSelector(selectUserData);

  useEffect(() => {
    dispatch(getToken());
    dispatch(getReligion());
    dispatch(getUserData())
    setTimeout(() => {
      if (religion == 1 && token) {
        //Check if token is expired, then logout user
        const decodedToken = jwtDecode(token);
        if (decodedToken.exp < Date.now() / 1000) {
          dispatch(logout());
          PushNotification.cancelAllLocalNotifications();
        } else {
          navigator.navigate(REGISTERED_MUSLIM_DASHBOARD_STACK);
        }

        dispatch(getUpdatedUserData({username:user?.username}))
      } else if (religion == 0 && token) {
        //Check if token is expired, then logout user
        const decodedToken = jwtDecode(token);
        if (decodedToken.exp < Date.now() / 1000) {
          dispatch(logout());
        } else {
          navigator.navigate(REGISTERED_HINDU_DASHBOARD_STACK);
        }

        dispatch(getUpdatedUserData({username:user?.username}))
      } else {
        navigator.navigate(LOGIN);
      }
    }, 2000);
  }, [dispatch, token, religion]);

  return (
    <ImageBackground
      style={styles.image}
      resizeMode="stretch"
      source={bg_gif}></ImageBackground>
  );
}
const styles = StyleSheet.create({
  container: {
    flexL: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  },
});

export default SplashScreeen;
