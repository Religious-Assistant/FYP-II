/**
 * @author Nadir Hussain
 * @version 1.0
 */

import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';

import {NativeBaseProvider} from 'native-base';
import useColorScheme from 'react-native/Libraries/Utilities/useColorScheme';
import RootNavigator from './src/navigation/RootNavigator';
import store from './src/redux/store';
import {Provider} from 'react-redux';

//Redux
import {useDispatch} from 'react-redux';
import {
  selectUserData,
  storeDeviceTokenIntoDB,
} from './src/redux/slices/auth_slices/authSlice';
import {useSelector} from 'react-redux';
import getDeviceToken from './getDeviceToken';
import Duas from './src/screens/muslim_module/Duas';
import AllahNames from './src/screens/muslim_module/AllahNames';

// //Notifee
// import notifee from '@notifee/react-native';
// import messaging from '@react-native-firebase/messaging';

// async function onMessageReceived(message) {
//   const data = await JSON.parse(message.data.notification);
//   console.log(data);
//   const channelId = await notifee.createChannel({
//     id: '123',
//     name: 'Default Channel',
//   });
//   notifee.displayNotification({
//     body: data['body'],
//     title: data['title'],
//     android: {
//       channelId,
//       smallIcon: 'ic_launcher', // optional, defaults to 'ic_launcher'.
//     },
//   });
// }

// messaging().onMessage(onMessageReceived);
// messaging().setBackgroundMessageHandler(onMessageReceived);

const EntryPoint = () => {

  // const dispatch = useDispatch();
  // const userData = useSelector(selectUserData);

  useEffect(() => {

    // async function getToken(){
    //   const token=await getDeviceToken()
    //   console.log('Device Token: ' + token);
    // }
    // getToken()
    return undefined;

  }, []);

  return <RootNavigator />;
};

const preloadedState = window.__PRELOADED_STATE__;

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <Provider store={store} serverState={preloadedState}>
      <NativeBaseProvider>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <EntryPoint/>
      </NativeBaseProvider>
    </Provider>
  );
};

export default App;
