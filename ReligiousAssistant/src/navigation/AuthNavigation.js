/**
 * @author Nadir
 * @version 1.0
 */

import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import {
  ENTER_AS_GUEST,
  LOGIN,
  OTP_VERIFICATION,
  SET_NEW_PASSWORD,
  SIGNUP,
  SPLASH_SCREEN,
} from './constants';
import ConnectAsGuest from '../screens/ConnectAsGuest';
import VerificationScreen from '../screens/VerificationScreen';
import SplashScreeen from '../screens/SplashScreeen';
import SetNewPassword from '../screens/SetNewPassword';

const AuthStack = createNativeStackNavigator();

function AuthStackNavigation() {
  return (
    <AuthStack.Navigator initialRouteName={SPLASH_SCREEN}>
      <AuthStack.Screen
        name={SPLASH_SCREEN}
        component={SplashScreeen}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name={LOGIN}
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name={SIGNUP}
        component={RegisterScreen}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name={ENTER_AS_GUEST}
        component={ConnectAsGuest}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name={OTP_VERIFICATION}
        component={VerificationScreen}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name={SET_NEW_PASSWORD}
        component={SetNewPassword}
        options={{headerShown: false}}
      />
    </AuthStack.Navigator>
  );
}

export default AuthStackNavigation;
