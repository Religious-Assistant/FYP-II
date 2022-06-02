/**
 * @author Nadir Hussain
 * @version 1.0
 */

import 'react-native-gesture-handler';
import React , {useEffect}from 'react';
import {StatusBar} from 'react-native';

import {NativeBaseProvider} from 'native-base';
import useColorScheme from 'react-native/Libraries/Utilities/useColorScheme';
import RootNavigator from './src/navigation/RootNavigator';
import RakahInfo from './src/screens/muslim_module/RakahInfo';
import AddMosque from './src/screens/muslim_module/AddMosque';
import Map from './src/components/Map'
import Announcements from './src/screens/muslim_module/Announcements';
import ConnectAsGuest from './src/screens/ConnectAsGuest';
const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <NativeBaseProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Map />
    </NativeBaseProvider>
  );
};

export default App;
