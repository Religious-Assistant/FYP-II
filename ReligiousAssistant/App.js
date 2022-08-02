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

//Notifee
import notifee from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import colors from './src/theme/colors';

async function onMessageReceived(message) {
  const data = await JSON.parse(message.data.notification);

  console.log(data)
  const channelId = await notifee.createChannel({
    id: data["channelId"],
    name: 'Default Channel',
  });

  notifee.displayNotification({
    body: data['body'],
    title: data['title'],
    android: {
      channelId,
      smallIcon: 'ic_launcher', // optional, defaults to 'ic_launcher',
      largeIcon:data['largeIcon'],
      autoCancel:false,
      category:AndroidCategory.CALL,
      importance:AndroidImportance.HIGH,
      // color:colors.secondary,
      actions:[
        {
          title:"Mark as Read",
          pressAction:{
            id:'read'
          }
        }
      ]
    },
  });
}

messaging().onMessage(onMessageReceived);
messaging().setBackgroundMessageHandler(onMessageReceived);

const EntryPoint = () => {

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
