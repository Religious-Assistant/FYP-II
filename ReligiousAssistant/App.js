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
import {Provider, useDispatch, useSelector} from 'react-redux';

//Notifee
import notifee, {EventType} from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import {
  getUserData,
  selectUserData,
} from './src/redux/slices/auth_slices/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PushNotification from 'react-native-push-notification';
import {
  getNamazTimesForUser,
  selectNamazTimesForUser,
} from './src/redux/slices/muslim_module_slices/mosqueNamazTimingsSlice';

import appIcon from './assets/images/Logo-muslim.png';
import {setHours} from './src/utils/helpers';

async function onMessageReceived(message) {
  const notification = await JSON.parse(message.data.notification);

  console.log(notification)
  // Only received when namaz times are updated by imam

  if (message.data.payload) {
    const payload = await message.data.payload;
    const namazTimes = await payload.split('#');

    const mosqueTimes = {
      fajr: {
        startTime: namazTimes[0].split('|')[0],
        endTime: namazTimes[0].split('|')[1],
      },
      zuhr: {
        startTime: namazTimes[1].split('|')[0],
        endTime: namazTimes[1].split('|')[1],
      },
      asr: {
        startTime: namazTimes[2].split('|')[0],
        endTime: namazTimes[2].split('|')[1],
      },
      maghrib: {
        startTime: namazTimes[3].split('|')[0],
        endTime: namazTimes[3].split('|')[1],
      },
      isha: {
        startTime: namazTimes[4].split('|')[0],
        endTime: namazTimes[4].split('|')[1],
      },
    };

    await AsyncStorage.setItem(
      'primary_mosque_times',
      JSON.stringify(mosqueTimes),
    );
  }

  const channelId = await notifee.createChannel({
    id: notification['channelId'],
    name: 'Default Channel',
  });

  notifee.displayNotification({
    body: notification['body'],
    title: notification['title'],
    android: {
      channelId,
      smallIcon: 'ic_launcher', // optional, defaults to 'ic_launcher',
      largeIcon: notification['largeIcon'],
      autoCancel: false,
      // color:colors.secondary,
      actions: [
        {
          title: 'Mark as Read',
          pressAction: {
            id: 'mark-as-read',
          },
        },
        {
          title: 'Open Up',
          pressAction: {
            id: 'open',
            launchActivity: 'default',
          },
        },
      ],
    },
  });
}

messaging().onMessage(onMessageReceived);
messaging().setBackgroundMessageHandler(onMessageReceived);

const EntryPoint = () => {
  //Namaz Notifications + Alarm if User is Muslim

  const dispatch = useDispatch();
  const user = useSelector(selectUserData);
  const mosqueTimes = useSelector(selectNamazTimesForUser);

  useEffect(() => {
    dispatch(getUserData());

    if(user){
      dispatch(
        getNamazTimesForUser({mosqueId: user?.preferences?.primaryMosque}),
      );  
    }
    const getNamazTimesInPrimaryMosque = async () => {
      const times = await AsyncStorage.getItem('primary_mosque_times');
      const parsedTimes = await JSON.parse(times);
      return await parsedTimes ? parsedTimes : mosqueTimes;
    };

    if (user) {
      if (user?.preferences?.namazNotifications) {
        getNamazTimesInPrimaryMosque()
          .then(times => {
            console.error(times);

            PushNotification.channelExists('primary_mosque_times', exists => {
              if (!exists) {
                createChannel();
              } else {
                createNotification(times?.fajr?.startTime);
                createNotification(times?.zuhr?.startTime);
                createNotification(times?.asr?.startTime);
                createNotification(times?.maghrib?.startTime);
                createNotification(times?.isha?.startTime);
              }
            });
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
  }, [dispatch]);

  const createChannel = async () => {
    await PushNotification.createChannel(
      {
        channelId: 'primary_mosque_times',
        channelName: 'My channel',
        channelDescription: 'A channel to categorise your notifications',
        // soundName: 'azan2.mp3',
        importance: 4,
        vibrate: true,
      },
      created => {
        console.log(`createChannel returned '${created}'`);
      },
    );
  };

  const createNotification = async time => {
    if (time.toUpperCase() == 'NONE') {
      return;
    }
    var alarm = new Date();
    await setHours(alarm, time);

    PushNotification.localNotificationSchedule({
      channelId: 'primary_mosque_times',
      title: '⏰Primary Mosque Notification⏰',
      message: 'Salah Wipes Away Sins',
      bigText:
        'And seek help through patience and prayer, and indeed, it is difficult except for the humbly submissive [to Allah]: \nSurah Baqrah (2:45)',
      importance: 4,
      vibrate: true,
      smallIcon: appIcon,
      date: alarm,
      allowWhileIdle: true,
    });
  };

  useEffect(() => {
    // Disable warnings
    console.disableYellowBox = true;

    //For Ios Ask permisson for notification
    const askPermission = async () => await messaging().requestPermission();
    askPermission();

    return notifee.onForegroundEvent(async ({type, detail}) => {
      const {notification, pressAction} = detail;

      if (pressAction.id === 'mark-as-read') {
        await notifee.cancelNotification(notification.id);
      }

      if (pressAction.id === 'open') {
        await notifee.cancelNotification(notification.id);
      }

      switch (type) {
        case EventType.DISMISSED:
          break;
        case EventType.PRESS:
          await notifee.cancelNotification(notification.id);
          break;
      }
    });
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
        <EntryPoint />
      </NativeBaseProvider>
    </Provider>
  );
};

export default App;
