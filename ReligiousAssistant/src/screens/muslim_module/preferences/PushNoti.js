/**
 * @author Kinza
 * @version 1.0
 */

import {StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {View, Text, Button} from 'react-native';

import PushNotification, {Importance} from 'react-native-push-notification';
import appIcon from '../../../../assets/images/Logo-muslim.png';
import moment from 'moment';

const PushNoti = () => {
  const time1 = moment('6:40:00 AM', 'HH:mm: A').diff(
    moment().startOf('day'),
    'seconds',
  );
  const time2 = moment('6:37 pM', 'HH:mm: A').diff(
    moment().startOf('day'),
    'seconds',
  );
  var hms = '07:01:00'; // your input string
  var a = hms.split(':'); // split it at the colons

  // minutes are worth 60 seconds. Hours are worth 60 minutes.
  var seconds = +a[0] * 60 * 60 + +a[1] * 60 + +a[2];
  //console.log(Date.now() + 20 * 1000);
  const azan = 'https://www.islamcan.com/audio/adhan/azan1.mp3';
  useEffect(() => {
    createChannels();
    console.log('done');
  }, []);

  const createChannels = () => {
    PushNotification.createChannel(
      {
        channelId: 'checkNotification1', // (required)
        channelName: 'My channel', // (required)
        channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
        soundName: 'azan2.mp3',
        importance: 4,
        vibrate: true,
      },
      created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
    );
  };
  function handleNoti() {
    console.log('pressed');

    PushNotification.localNotificationSchedule({
      channelId: 'checkNotification1',
      title: 'Namaz Notification',
      message: 'Fajr Namaz Time 10 se',
      soundName: 'azan2.mp3',
      importance: 4,
      vibrate: true,
      smallIcon: appIcon,
      date: new Date(Date.now() + 10 * 1000),
      allowWhileIdle: true,
      // repeatType:'day'
    });
  }
  return (
    <View>
      <Text>AutoSilent</Text>
      <Button
        title="Handle Notification"
        onPress={() => {
        handleNoti();
        }}></Button>
    </View>
  );
};

export default PushNoti;

const styles = StyleSheet.create({});
