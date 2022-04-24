import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
const AuthStack=createNativeStackNavigator();
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import { ENTER_AS_GUEST, LOGIN, OTP_VERIFICATION, SIGNUP } from './constants';
import ConnectAsGuest from '../screens/ConnectAsGuest';
import VerificationScreen from '../screens/VerificationScreen';

function AuthStackNavigation(){
    return(
        
        <AuthStack.Navigator initialRouteName={LOGIN} >
            <AuthStack.Screen name={LOGIN} component={LoginScreen} options={{headerShown:false}} />
            <AuthStack.Screen name={SIGNUP} component={RegisterScreen} options={{headerShown:false}}/>
            <AuthStack.Screen name={ENTER_AS_GUEST} component ={ConnectAsGuest} options={{headerShown:false}} />
            <AuthStack.Screen name={OTP_VERIFICATION} component ={VerificationScreen} options={{headerShown:false}} />
        </AuthStack.Navigator>
        
    )
}

export default AuthStackNavigation;