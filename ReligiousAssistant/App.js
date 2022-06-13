/**
 * @author Nadir Hussain
 * @version 1.0
 */

import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar} from 'react-native';

import {NativeBaseProvider} from 'native-base';
import useColorScheme from 'react-native/Libraries/Utilities/useColorScheme';
import RootNavigator from './src/navigation/RootNavigator';
import store from './src/redux/store'
import {Provider} from 'react-redux'
import Accountability from './src/screens/muslim_module/Accountability';
import Alerts from './src/screens/muslim_module/Alerts';
import Announcements from './src/screens/muslim_module/Announcements';
import Profile from './src/screens/muslim_module/Profile';
const preloadedState = window.__PRELOADED_STATE__


const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  
  return (
    <Provider store={store} serverState={preloadedState}>
    <NativeBaseProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Profile/>
    </NativeBaseProvider>
    </Provider>
  );
};

export default App;
