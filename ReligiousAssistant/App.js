/**
 * @author Nadir Hussain
 * @version 1.0
 */

import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  useColorScheme,
  View
} from 'react-native';
import { NativeBaseProvider } from 'native-base';

import LoginScreen from './src/screens/LoginScreen';
import SplashScreeen from './src/screens/SplashScreeen';
import ConnectAsGuest from './src/screens/ConnectAsGuest';
import RegisterScreen from './src/screens/RegisterScreen';

const App= () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <NativeBaseProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <RegisterScreen />
    </NativeBaseProvider>
  );
};

export default App;