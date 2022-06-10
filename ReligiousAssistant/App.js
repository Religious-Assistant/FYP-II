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
import QiblaDirection from './src/screens/muslim_module/QiblaDirection';
import MosqueConsensusNoti from './src/screens/muslim_module/MosqueConsensusNoti';
import NewMosqueAddedNoti from './src/screens/muslim_module/NewMosqueAddedNoti';
import Profile from './src/screens/muslim_module/Profile'
const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <NativeBaseProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Profile/>
    </NativeBaseProvider>
  );
};

export default App;
