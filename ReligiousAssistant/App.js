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
import LearnNamaz from './src/screens/muslim_module/LearnNamaz';
import ApplyAsImam from './src/screens/muslim_module/ApplyAsImam';
const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <NativeBaseProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ApplyAsImam/>
    </NativeBaseProvider>
  );
};

export default App;
