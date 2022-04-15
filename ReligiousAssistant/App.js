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
import RegisteredMuslimDashboard from './src/screens/muslim_module/RegisteredMuslimDashboard';

const App= () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <NativeBaseProvider>
    <SafeAreaView>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <RegisteredMuslimDashboard />
    </SafeAreaView>
    </NativeBaseProvider>
  );
};

export default App;