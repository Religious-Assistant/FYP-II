/**
 * @author Nadir Hussain
 * @version 1.0
 */

import 'react-native-gesture-handler';
import React from 'react';
import {
  StatusBar,
} from 'react-native';

import {NativeBaseProvider } from 'native-base';
import useColorScheme from 'react-native/Libraries/Utilities/useColorScheme';
import RootNavigator from './src/navigation/RootNavigator';
import QiblaDirection from './src/screens/muslim_module/QiblaDirection';
const App= () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <NativeBaseProvider>
      <StatusBar backgroundColor={'transparent'} barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <QiblaDirection />
    </NativeBaseProvider>
  );
};

export default App;