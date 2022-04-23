import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
const AuthStack=createNativeStackNavigator();
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

function AuthStackNavigation(){
    return(
        
        <AuthStack.Navigator initialRouteName='Login' >
            <AuthStack.Screen name='Login' component={LoginScreen} options={{headerShown:false}} />
            <AuthStack.Screen name='Register' component={RegisterScreen} options={{headerShown:false}}/>
        </AuthStack.Navigator>
        
    )
}

export default AuthStackNavigation;