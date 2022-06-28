/**
 * @author Kinza Kiran
 * @version 1.0
 */

import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {StyleSheet, ImageBackground, Dimensions} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import bg_gif from '../../assets/images/splash.gif';
import {LOGIN, REGISTERED_HINDU_DASHBOARD_STACK, REGISTERED_MUSLIM_DASHBOARD_STACK} from '../navigation/constants';
import { getReligion, getToken, getUserData, selectReligion, selectToken, selectUserData } from '../redux/slices/auth_slices/authSlice';

function SplashScreeen() {

  const navigator = useNavigation();

  const dispatch=useDispatch()

  const token=useSelector(selectToken)
  const religion=useSelector(selectReligion)

  console.log(`User Token: ${token}  \nUser Religion: ${religion}`)

  useEffect(() => {

    dispatch(getToken())
    dispatch(getReligion())
    dispatch(getUserData())

    setTimeout(() => {
      
    if(religion==1 && token){
      
      navigator.navigate(REGISTERED_MUSLIM_DASHBOARD_STACK)
    }
    else if(religion==0 && token){
      navigator.navigate(REGISTERED_HINDU_DASHBOARD_STACK)
    }
    else{
      navigator.navigate(LOGIN)
    }
    }, 2000);


  }, [token, religion]);

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
